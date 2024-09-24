<template>
    <button type="button"
        :disabled="props.disabled"
    >
        <span v-if="props.name">
            {{ props.name }}
        </span>

        <slot></slot>

        <Icon icon="loader-4" v-if="props.loading" />
    </button>
</template>

<script setup>
const props = defineProps({
    name: { type: String, default: '' },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
});
</script>

<style lang="scss" scoped>
button {
    cursor: pointer;
    border: none;
    outline: none;
    gap: 4px;
    height: 48px;
    display: flex;
    font-variant: unset;
    transition: all 0.4s;
    align-items: center;
    justify-content: center;
    background: $turquoise;
    padding: 0 20px;
    border-radius: 20px;

    @include font-btn;
    color: $black;
    transition: all 0.2s;

    &:hover {
        opacity: .8;
    }

    &[disabled] {
        cursor: default;
        filter: grayscale(1);
        opacity: .2;
        span {
            opacity: .5;
        }
    }

    &.light {
        padding: 0 10px;
        height: 32px;
        min-width: 54px;
        border-radius: 15px;
        @include font-label;
        flex-shrink: 0;
    }

    &.secondary {
        background-color: transparent;
        color: $white;
        position: relative;
        background: linear-gradient(to right, $persian-blue, $turquoise) border-box;

        &:before {
            content: "";
            position: absolute;
            left: 1px;
            top: 1px;
            right: 1px;
            background: $black;
            bottom: 1px;
            border-radius: 20px;
        }
        span {
            z-index: 1;
            @include gradient-color;
        }
    }

    &.loader {
        background-color: transparent;
        position: relative;
        overflow: hidden;
        svg {
            fill: $turquoise;
            height: 360px;
            width: 34px;
            animation: svg-loader infinite 3s;
            transform: translateY(-50%)
        }

        @keyframes svg-loader {
            0% {
                transform: translateY(-50%);
                fill: $turquoise;
            }
            100% {
                transform: translateY(55%);
                fill: $persian-blue;
            }
        }
    }

    &.icon {
        width: 50px;
        height: 50px;
        background: transparent;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        fill: $white;
        font-size: 18px;
    }
}
</style>
