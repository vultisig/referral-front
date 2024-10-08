<template>
    <div class="page-container" v-if="user.profile.id">
        <Icon icon="airdrop-secondary"/>
        <h1 v-html="t('pages.airdrop.title')"></h1>

        <ul class="spoilers" v-if="data.qa?.length">
            <li v-for="(item, id) in data.qa"
                :key="id"
                :class="{ opened: item.opened }"
            >
                <button type="button"
                    @click="item.opened = !item.opened"
                >
                    <span v-html="item.q"></span>
                    <Icon icon="arrow"/>
                </button>
                <div v-html="item.a"></div>
            </li>
        </ul>

        <div class="button-box">
            <Button
                :name="t('pages.airdrop.join')"
                class="secondary"
                @click="joinAirdrop"
            />
        </div>
    </div>
</template>

<script setup>
    import { reactive } from 'vue';
    import { useI18n } from 'vue-i18n';
    import Button from '@/components/forms/Button.vue';
    import { mapState } from '@/map-state';

    const { t, tm, rt } = useI18n();
    const { user } = mapState();

    const qa = tm('pages.airdrop.qa').map(item => ({
        q: rt(item.q),
        a: rt(item.a)
    }));

    const data = reactive({
        qa: qa || []
    });

    const joinAirdrop = () => {
        if (window.Telegram?.WebApp) {
            window.Telegram?.WebApp.openLink(import.meta.env.VITE_APP_JOIN_AIRDROP_URL);
        } else {
            window.open(import.meta.env.VITE_APP_JOIN_AIRDROP_URL, '_blank');
        }
    };
</script>

<style lang="scss" scoped>
    .page-container {
        gap: 14px;
        padding: 40px 10px 0;

        & > svg {
            width: 90px;
            height: 90px;
            margin: 0 auto;
            flex-shrink: 0;
        }

        h1 {
            margin: 0;
            padding: 0;
            @include font-h1;
            color: $white;
            text-align: center;
            flex-shrink: 0;
        }

        & > .description {
            @include font-b;
            color: $black-2;
            display: flex;
            flex-direction: column;
            gap: 4px;
            flex-shrink: 0;
            padding: 0 12px;
        }

        .spoilers {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 24px 0;

            li {
                display: flex;
                flex-direction: column;
                width: 100%;
                border: solid 1px $black;
                border-radius: 12px;

                button {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding: 0 12px;
                    width: 100%;
                    border: none;
                    height: 52px;
                    background: $black-1;
                    border-radius: 12px;
                    cursor: pointer;
                    outline: none;

                    span {
                        margin-right: auto;
                        @include font-secondray-btn;
                        color: $white;
                    }

                    svg {
                        fill: $white;
                        width: 16px;
                        height: 16px;
                        transform: rotate(0);
                        transition: all .4s;
                    }
                }

                & > div {
                    display: none;
                }

                &.opened {
                    box-shadow: 0px 0px 1px white;
                    border-radius: 12px;
                    & > button {
                        svg {
                            transform: rotate(180deg);
                        }
                    }
                    & > div {
                        display: block;
                        @include font-b;
                        color: $white;
                        padding: 24px 12px;
                        background: $black;
                        border-bottom-right-radius: 12px;
                        border-bottom-left-radius: 12px;
                    }
                }
            }
        }

        .social-box {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-top: auto;
        }

        .button-box {
            padding: 12px 0;
            flex-shrink: 0;
            position: sticky;
            bottom: 0;
            margin-top: auto;

            button {
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 8px;
            }
        }
    }
</style>
