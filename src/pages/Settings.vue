<template>
    <div class="page-container" v-if="user.profile.id">
        <Icon icon="settings-secondary"/>
        <h1 v-html="t('pages.settings.title')"></h1>

        <ul class="params">
            <li>
                <button type="button"
                    @click="openWallet"
                >
                    <span v-html="user.profile.wallet_public_key_ecdsa ? t('pages.settings.wallet.edit') : t('pages.settings.wallet.add')"></span>
                    <Icon icon="arrow"/>
                </button>
            </li>
        </ul>

        <div class="social-box">
            <Button
                v-for="(item, id) in data.socials" :key="id"
                class="icon"
                @click="openSocial(item)"
            ><Icon :icon="item.icon"/></Button>
        </div>
    </div>
</template>

<script setup>
    import { reactive } from 'vue';
    import { useI18n } from 'vue-i18n';
    import Button from '@/components/forms/Button.vue';
    import { mapState, mapMutations } from '@/map-state';

    const { t } = useI18n();
    const { user } = mapState();
    const { openModal } = mapMutations();

    const data = reactive({
        socials: [
            {
                icon: 'x',
                url: 'https://twitter.com/vultisig'
            }, {
                icon: 'discord',
                url: 'https://discord.gg/54wEtGYxuv'
            }, {
                icon: 'telegram',
                url: 'https://t.me/vultisig'
            }, {
                icon: 'github',
                url: 'https://github.com/Vultisig'
            }
        ]
    });

    const openWallet = () => {
        openModal('wallet');
    };

    const openSocial = (item) => {
        if (window.Telegram?.WebApp) {
            window.Telegram?.WebApp.openLink(item.url);
        } else {
            window.open(item.url, '_blank');
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

        .params {
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
                        transform: rotate(-90deg);
                        transition: all .4s;
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
            margin-bottom: 24px;
        }
    }
</style>
