<template>
    <BaseModal
        name="achievement"
        @close="close"
        class="full-size light"
    >
        <template v-slot:content>
            <div v-if="data.achievement"
                class="achievement-box"
                :style="{ 'background-color': data.achievement?.color }"
            >
                <Stars :count="10" />

                <span :class="{ loaded: data.loaded }">
                    <img :src="getUrl(data.achievement.icon)" :alt="data.achievement.name" @load="onLoad" />
                    <img :src="getUrl(data.achievement.icon)"
                        :alt="data.achievement.name"
                        :style="data.style"
                    />
                </span>

                <label>{{ data.achievement.name }}</label>

                <p v-if="data.achievement.description" v-html="data.achievement.description"></p>

                <div class="buttons">
                    <Button :name="t('common.close')" class="invert" @click="close"/>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script setup>
    import Button from '@/components/forms/Button.vue';
    import Stars from '@/components/forms/Stars.vue';
    import BaseModal from '@/components/modals/BaseModal.vue';
    import { reactive, onMounted } from 'vue';
    import { mapMutations, mapGetters } from '@/map-state';
    import { useI18n } from 'vue-i18n';
    import { delay } from '@/utils/utils';
    import { Howl } from 'howler';

    const { t } = useI18n();
    const { closeModal } = mapMutations();
    const { getModalData } = mapGetters();

    const data = reactive({
        loaded: false,
        achievement: null,
        style: {
            '--achievement-random-deg': `${ Math.ceil(Math.random() * 360) }deg`
        }
    });

    const getUrl = (icon) => {
        const path = `/img/achievements/${icon}`;
        return new URL(path, import.meta.url).href;
    }

    const onLoad = async () => {
        const sound = new Howl({
            src: [new URL('/achievement.mp3', import.meta.url).href]
        });

        await delay(200);
        data.loaded = true

        sound.play();
    }

    const close = () => {
        closeModal('achievement');
    }

    onMounted(() => {
        const payload = getModalData.value('achievement');
        data.achievement = payload;
    });
</script>

<style lang="scss" scoped>
    .achievement-box {
        display: flex;
        flex-direction: column;
        gap: 42px;
        padding: 84px 24px 32px;
        height: 100%;
        position: relative;

        & > span {
            width: 150px;
            flex-shrink: 0;
            height: 230px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            transform: scale(0);
            margin: 0 auto;

            $deg: calc(var(--achievement-random-deg) + 1deg);

            img {
                width: 100%;

                &:nth-child(2) {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%); 
                    filter: brightness(9999);

                    -webkit-mask-size: 100%;
                    -webkit-mask-repeat: no-repeat;
                    -webkit-mask-position: left top, left bottom;
                    -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);
                    @include sunshine(3s, $deg, 0);
                }
            }

            &.loaded {
                transform: scale(1);
                animation: achievement-loaded .4s linear;
            }
            @keyframes achievement-loaded {
                0% {
                    transform: scale(0);
                }
                30% {
                    transform: scale(1.2);
                }
                50% {
                    transform: scale(.8);
                }
                70% {
                    transform: scale(1.1);
                }
                90% {
                    transform: scale(.9);
                }
                100% {
                    transform: scale(1);
                }
            }
        }

        & > label {
            @include font-h1;
            color: $white;
            text-align: center;
            // max-width: 210px;
        }

        & > p {
            padding: 0;
            @include font-secondray-btn;
            color: $white;
            text-align: center;
        }
    }

    .buttons {
        display: flex;
        flex-direction: column;
        padding: 0;
        gap: 20px;
        margin-top: auto;
    }
</style>
