<template>
    <Loader v-if="data.loading && !data.referrals.length" class="light" />

    <template v-else-if="user.profile?.id">
        <div class="page-container">
            <Icon icon="referrals" :alt="t('pages.referrals.title')"/>
            <h1 v-html="t('pages.referrals.title')" ></h1>
            <!-- <span v-html="t('pages.referrals.description')" class="description"></span> -->

           
            <EmptyLabel v-if="!data.referrals.length"
                :title="t('pages.referrals.empty.title')"
                :description="t('pages.referrals.empty.description')"
                class="empty"
            />

            <div v-else class="users-list">
                <span>
                    {{ user.profile?.referrals_count }} <span v-html="t('pages.referrals.total')"></span><br>
                    <span v-html="t('pages.referrals.description')"></span>
                </span>

                <ul>
                    <li v-for="item in data.referrals"
                        :key="item.username"
                    >
                        <Avatar :name="item.username || item.first_name || t('common.unnamed')" />
                        <div>
                            <div>
                                <span>{{ item.username || item.first_name || t('common.unnamed') }}</span>
                            </div>

                            <Button v-if="item.loading" class="light loader" :loading="true" />
                            <span v-else class="state">
                                <span v-if="!item.wallet_public_key_ecdsa"
                                    v-html="t('pages.referrals.steps.registered')"
                                ></span>
                                <template v-else-if="!item.join_airdrop">
                                    <span v-html="t('pages.referrals.steps.added')"></span>
                                    <Icon icon="wallet"/>
                                </template>
                                <template v-else>
                                    <span v-html="t('pages.referrals.steps.joined')"></span>
                                    <Icon icon="verified"/>
                                </template>
                            </span>
                        </div>
                    </li>
                </ul>

                <Button :name="t('common.more')" class="light secondary"
                    v-if="data.total > data.referrals.length && !data.loading"
                    @click="getReferralsList"
                />
                <Button v-if="data.loading" class="light loader" :loading="true" />
            </div>
        </div>

        <div class="invite-box">
            <Button
                :name="t('pages.referrals.invite')"
                @click="invite"/>
        </div>
    </template>
</template>

<script setup>
    import { onMounted, reactive, watch } from 'vue';
    import { useI18n } from 'vue-i18n';
    import Avatar from '@/components/forms/Avatar.vue';
    import Button from '@/components/forms/Button.vue';
    import EmptyLabel from '@/components/forms/EmptyLabel.vue';
    import Loader from '@/components/forms/Loader.vue';
    import { mapActions, mapMutations, mapState } from '@/map-state';
    import { delay } from '@/utils/utils';

    const { t } = useI18n();
    const { user, settings, ready } = mapState();
    const { openModal } = mapMutations();
    const { getReferrals, me, checkAirdropStatus } = mapActions();

    const data = reactive({
        referrals: [],
        total: 0,
        loading: true
    });

    const invite = () => {
        openModal('invite');
    };

    const getAirdropInfo = async (item) => {
        if (!item.wallet_public_key_ecdsa) {
            return;
        }

        item.loading = true;
        item.join_airdrop = !!await checkAirdropStatus(item.uuid);
        item.loading = false;

        const idx = data.referrals.indexOf(item);
        if (idx !== -1) {
            data.referrals.splice(idx, 1, {...item});
        }
    }

    const getReferralsList = async () => {
        data.loading = true;
        await delay(400);

        const payload = await getReferrals({
            skip: data.referrals.length,
            take: +settings.value.REFERRALS_DEFAULT_TAKE || 30
        });

        if (payload?.total) {
            data.total = payload.total;
        }

        if (payload?.items) {
            payload?.items.forEach(item => {
                item.join_airdrop = false;
                getAirdropInfo(item);
            });
            data.referrals = [...data.referrals, ...payload.items];
        }

        data.loading = false;
    };

    watch(
        () => ready.value,
        async () => {
            if (ready.value) {
                await me();
                getReferralsList();
            }
        }
    );

    onMounted(async () => {
        if (ready.value) {
            await me();
            getReferralsList();
        }
    });
</script>

<style lang="scss" scoped>
    .page-container {
        gap: 24px;
        padding: 40px 10px 0;
        overflow: auto;
        @include scrollbar();
        display: flex;
        flex-direction: column;
        flex: 1 1;

        & > svg {
            width: 240px;
            height: 80px;
            min-height: 36px;
            flex-shrink: 0;
            margin: 0 auto;
        }

        h1 {
            margin: 0;
            padding: 0;
            @include font-h1;
            color: $white;
            text-align: center;
        }

        & > .description {
            @include font-b;
            color: $black-2;
            // display: flex;
            // flex-direction: column;
            // gap: 4px;
            // flex-shrink: 0;
            // padding: 0 12px;
        }

        & > .empty {
            margin: auto;
        }

        .users-list {
            display: flex;
            gap: 24px;
            flex-direction: column;
            padding-bottom: 24px;

            & > span {
                @include font-b-bold;
                color: $white;
            }

            & > ul {
                padding: 0;
                margin: 0;
                list-style: none;
                display: flex;
                flex-direction: column;
                flex: 1 1;
                gap: 12px;
                li {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: start;
                    gap: 12px;
                    background-color: $black-1;
                    padding: 0 20px;
                    border-radius: 20px;
                    min-height: 56px;

                    .loader {
                        margin: 0;
                        padding: 0;
                        width: 18px;
                        min-width: auto;
                        border-radius: 0;
                    }

                    & > div {
                        // padding: 20px 0;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        flex: 1 0 1%;
                        width: 1%;
                        gap: 8px;

                        div {
                            display: flex;
                            flex-direction: column;
                            gap: 8px;
                            margin-right: auto;
                            span {
                                @include font-b-bold;
                                color: $white;
                                max-width: 180px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }

                        .state {
                            @include font-label;
                            font-weight: normal; // Temp
                            color: $white;
                            display: flex;
                            flex-direction: row;
                            gap: 8px;
                            align-items: center;
                            span {
                                opacity: .4;
                                display: flex;
                                gap: 8px;
                                align-items: center;
                                flex-direction: row;
                            }
                            svg {
                                width: 18px;
                                height: 18px;
                            }
                        }

                        svg {
                            // margin-left: auto;
                        }
                    }
                }
            }

            & > button {
                margin: 0 auto;
            }
        }
    }

    .invite-box {
        padding: 24px 10px 12px;
        background-color: $black-0;
        box-shadow: 0px 4px 12px 4px $black-0;
        flex-shrink: 0;
        position: sticky;
        bottom: 0;
        margin-top: auto;
        button {
            width: 100%;
        }
    }
</style>
