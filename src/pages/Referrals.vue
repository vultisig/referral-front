<template>
    <Loader v-if="data.loading && !data.referrals.length" class="light" />

    <template v-else-if="user.profile?.id">
        <div class="page-container">
            <Icon icon="frens" :alt="t('pages.referrals.title')"/>
            <h1 v-html="t('pages.referrals.title')" ></h1>
           
            <EmptyLabel v-if="!data.referrals.length"
                :title="t('pages.referrals.empty.title')"
                :description="t('pages.referrals.empty.description')"
                class="emty"
            />

            <div v-else class="users-list">
                <span>{{ data.total }} <span v-html="t('pages.referrals.total')"></span></span>

                <ul>
                    <li v-for="item in data.referrals"
                        :key="item.username"
                    >
                        <Avatar :name="item.username || item.first_name" />
                        <div>
                            <div>
                                <span>{{ item.username || item.first_name }}</span>
                            </div>

                            <Icon v-if="item.wallet_public_key_ecdsa" icon="verified"/>
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
    const { getReferrals, me } = mapActions();

    const data = reactive({
        referrals: [],
        total: 0,
        loading: true
    });

    const invite = () => {
        openModal('invite');
    };

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
        padding: 60px 10px 0;
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

        & > .emty {
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

                    & > div {
                        padding: 20px 0;
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
                            span {
                                @include font-b-bold;
                                color: $white;
                                max-width: 180px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                        }

                        svg {
                            margin-left: auto;
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
