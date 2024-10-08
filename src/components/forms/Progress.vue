<template>
    <div>
        <svg viewBox="0 0 200 200" class="progress-bar">
            <circle r="80" cx="100" cy="100" fill="none" stroke-width="10"
                stroke="var(--Color-primary-black-3)">
            </circle>

            <circle r="80" cx="100" cy="100" fill="none" stroke-width="10" stroke="url(#progress-bar-gradient)"
                stroke-linecap="round"
                :stroke-dasharray="`${ (data.value * 502.4 / 100).toFixed(1) } 502.4`"
                stroke-dashoffset="0" class="gradient"
                style="
                    transform: rotate(-90deg);
                    transform-origin: center;
                "></circle>

            <defs>
                <linearGradient id="progress-bar-gradient">
                    <stop offset="0%" stop-color="var(--Color-primary-turquoise)"></stop>
                    <stop offset="100%" stop-color="var(--Color-primary-persian-blue)"></stop>
                </linearGradient>
            </defs>
        </svg>

        <span v-html="props.title" v-if="props.title"></span>
    </div>
</template>

<script setup>
    import { reactive, watch } from 'vue';
    import { delay } from '@/utils/utils';

    const props = defineProps({
        title: { type: String, default: '' },
        value: { type: Number, default: 0 }
    });

    const data = reactive({
        value: props.value
    });

    watch(
        () => props.value,
        async () => {
            let steps = 14;
            const letters = ((data.value).toString().split('.')[1] || '').length;
            const diff = +((props.value - data.value) / steps).toFixed(letters);

            const doIt = async () => {
                if (!steps) {
                    data.value = props.value;
                    return;
                }

                data.value += diff;
                steps -=1;
                await delay(10);
                doIt();
            };

            doIt();
        }
    );
</script>

<style lang="scss" scoped>
div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 240px;
    height: 240px;

    svg {
        width: 100%;
        height: 100%;
    }

    & > span {
        @include font-b-bold;
        color: $black-2;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        text-align: center;
    }
}
</style>
