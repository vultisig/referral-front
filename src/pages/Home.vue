<template>
    <div class="page-container" v-if="user.profile.id">
        <Avatar :name="user.profile.first_name" class="big"/>
        <h1>{{ user.profile.username }}</h1>


        <template v-if="!user.profile.wallet_public_key_ecdsa">
            <EmptyLabel
                :title="t('pages.home.wallet.empty.title')"
                :description="t('pages.home.wallet.empty.description')" />

            <img class="home-img" :src="emptyImg" />

            <div class="button-box">
                <Button
                    :name="t('pages.home.wallet.add')"
                    class="secondary"
                    @click="openWallet"
                />
            </div>
        </template>
        <template v-else>
            <ul class="stats">
                <li>
                    <Icon icon="referrals-secondary"/>
                    <div>
                        <span v-html="t('pages.home.stats.refferals')"></span>
                        <span>{{ user.profile.referrals_count }}</span>
                    </div>
                </li>
                <template v-if="user.vasProfile?.uid">
                    <li>
                        <Icon icon="wallet"/>
                        <div>
                            <span v-html="t('pages.home.stats.name')"></span>
                            <span>{{ user.vasProfile.name }}</span>
                        </div>
                    </li>
                    <li>
                        <Icon icon="verified"/>
                        <div>
                            <span v-html="t('pages.home.stats.joined.title')"></span>
                            <span>{{ user.vasProfile.join_airdrop ? t('pages.home.stats.joined.yes') : t('pages.home.stats.joined.no') }}</span>
                        </div>
                    </li>

                    <template v-if="user.vasProfile?.join_airdrop">
                        <li>
                            <Icon icon="rank"/>
                            <div>
                                <span v-html="t('pages.home.stats.rank')"></span>
                                <span>#{{ user.vasProfile.rank }}</span>
                            </div>
                        </li>
                        <li>
                            <Icon icon="dollar"/>
                            <div>
                                <span v-html="t('pages.home.stats.balance.title')"></span>
                                <span>{{ numberWithSpaces(user.vasProfile.balance) }} $</span>
                            </div>
                            <!-- <div v-if="user.vasProfile.balance < 50" class="warning">
                                <span v-html="t('pages.home.stats.balance.error')"></span>
                                <Icon icon="triangle-warning"/>
                            </div> -->
                        </li>
                        <li>
                            <Icon icon="coin"/>
                            <div>
                                <span v-html="t('pages.home.stats.farmed.title')"></span>
                                <span>{{ user.vasProfile.total_points }} {{ t('pages.home.stats.farmed.points') }}</span>
                            </div>
                        </li>
                    </template>
                </template>
            </ul>

            <div class="button-box">
                <Button
                    :name="t('pages.home.wallet.view')"
                    class="secondary"
                    @click="viewWallet"
                />
            </div>
        </template>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { useI18n } from 'vue-i18n';
    import Avatar from '@/components/forms/Avatar.vue';
    import Button from '@/components/forms/Button.vue';
    import EmptyLabel from '@/components/forms/EmptyLabel.vue';
    import { mapMutations, mapState } from '@/map-state';
    import { numberWithSpaces } from '@/utils/utils';

    const { t } = useI18n();
    const { user } = mapState();
    const { openModal } = mapMutations();

    const emptyImg = computed(() => {
        const path = `/img/problems.svg`;
        return new URL(path, import.meta.url).href;
    });
    
    const viewWallet = () => {
        const params = [
            `public_key_ecdsa=${user.value.profile?.wallet_public_key_ecdsa}`,
            `public_key_eddsa=${user.value.profile?.wallet_public_key_eddsa}`
        ].join('&');

        if (window.Telegram?.WebApp) {
            window.Telegram?.WebApp.openLink(import.meta.env.VITE_APP_JOIN_AIRDROP_URL + `&${params}`);
        } else {
            window.open(import.meta.env.VITE_APP_JOIN_AIRDROP_URL + `&${params}`, '_blank');
        }
    };

    const openWallet = () => {
        openModal('wallet');
    };

</script>

<style lang="scss" scoped>
    .page-container {
        gap: 14px;
        padding: 40px 10px 0;
        & > .big {
            margin: 0 auto;
        }

        h1 {
            margin: 0;
            padding: 0;
            @include font-h1;
            color: $white;
            // @include gradient-color;
            text-align: center;
        }

        .home-img {
            width: 200px;
            height: 200px;
            margin: auto;
        }


        .description {
            @include font-b;
            color: $black-2;
            display: flex;
            flex-direction: column;
            gap: 4px;
            flex-shrink: 0;
            padding: 0 12px;
            align-items: start;
            span {
                white-space: normal;
                max-width: 100%;
                word-wrap: break-word;
            }
        }

        .stats {
            list-style: none;
            display: flex;
            flex-direction: column;
            padding: 0;
            margin: auto;
            gap: 8px;
            width: 100%;

            li {
                display: flex;
                flex: 1 1 100%;
                flex-direction: row;
                gap: 16px;
                @include font-b;
                width: 100%;
                background: $black-1;
                border-radius: 12px;
                padding: 12px 16px;
                align-items: center;
                
                border-top-right-radius: 24px;
                border-top-left-radius: 0;
                border-bottom-right-radius: 0;
                border-bottom-left-radius: 24px;
                flex-wrap: wrap; 

                &:nth-child(2n) {
                    flex-direction: row-reverse;
                    border-top-left-radius: 24px;
                    border-top-right-radius: 0;
                    border-bottom-left-radius: 0;
                    border-bottom-right-radius: 24px;
                    svg {
                        margin-left: auto;
                        margin-right: 0;
                    }
                    div {
                        align-items: start;
                    }
                }

                svg {
                    width: 32px;
                    height: 32px;
                    margin-right: auto;
                    animation: stat-svg infinite 4s;
                }

                @keyframes stat-svg {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(.85);
                    }
                    100% {
                        transform: scale(1);
                    }
                }

                .warning {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 4px;
                    justify-content: end;
                    width: 100%;
                    flex: 1 1 100%;
                    svg {
                        width: 16px;
                        height: 16px;
                        margin: 0;
                        animation: none;
                    }
                    span {
                        @include font-small;
                    }
                }

                div {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    align-items: end;
                    span {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        gap: 4px;

                        &:nth-child(1) {
                        }
                        &:nth-child(2) {
                            @include font-h3;
                            line-height: 16px;
                        }
                    }
                }
            }
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
