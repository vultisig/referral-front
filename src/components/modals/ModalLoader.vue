<template>
    <BaseModal name="loader" class="full-size">
        <template v-slot:content>
            <div class="loader-box"
                :style="{ 'background-image': `url(/img/airdrop_bg_${ Math.random() > .5 ? 1 : 2 }.jpg)` }"
            >
                <div class="description">
                    <label v-html="t('modals.loader.description.title')"></label>
                    <span v-html="t('modals.loader.description.text')"></span>
                </div>

                <div class="bg"></div>
                <Loader class="opacity-mode" />
            </div>
        </template>
    </BaseModal>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import BaseModal from '@/components/modals/BaseModal.vue';
import Loader from '@/components/forms/Loader.vue';

const { t } = useI18n();
</script>

<style lang="scss" scoped>
    .loader-box {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-size: cover;
        background-position: center;

        &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 40%, $black 95%, $black 100%);
        }

        .description {
            display: flex;
            position: absolute;
            bottom: 32px;
            left: 0;
            right: 0;
            flex-direction: column;
            gap: 12px;
            align-items: center;
            label {
                @include font-h2;
                color: $white;
                text-transform: uppercase;
                text-align: center;
            }
            span {
                @include font-b;
                color: $white;
                text-align: center;
            }
        }

        .bg {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            background: $black;
            -webkit-mask-size: 100%;
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-position: left top, left bottom;
            -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);
            animation: bg-gradient 1.4s;

            &:after {
                position: absolute;

                background-image: linear-gradient(222deg, var(--Color-primary-black-0) 17px, transparent 18px), linear-gradient(45deg, var(--Color-primary-black-1) 17px, transparent 18px);
                background-size: 50px 50px;
                background-repeat: repeat;

                content: "";
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                animation: vulti-loader infinite 20s;
            }

            @keyframes vulti-loader {
                0% {
                    background-position-x: 0%;
                    background-position-y: 0%;
                }
                100% { 
                    background-position-x: 100%;
                    background-position-y: 100%;
                }
            }

            @keyframes bg-gradient {
                0% {
                    -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%);
                }
                74% {
                    -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%);
                }
                @for $i from 0 through 25 {
                    #{$i * 1% + 75%} {
                        -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) $i * 3%, rgba(0, 0, 0, 1) $i * 3% + 20%, rgba(0, 0, 0, 1) 100%);
                    }
                }
            }
        }
    }
</style>
