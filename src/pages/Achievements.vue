<template>
    <Loader v-if="data.loading && !data.achievements.length" class="light" />

    <template v-else-if="user.profile?.id">
        <div class="page-container">
            <Icon icon="achievements" :alt="t('pages.achievements.title')"/>
            <h1 v-html="t('pages.achievements.title')" ></h1>
           
            <EmptyLabel v-if="!data.achievements.length"
                :title="t('pages.achievements.empty.title')"
                :description="t('pages.achievements.empty.description')"
                class="empty"
            />

            <div v-else class="achievements-list">
                <ul>
                    <li v-for="(item, id) in data.achievements"
                        :key="id"
                    >
                    </li>
                </ul>

                <Button :name="t('common.more')" class="light secondary"
                    v-if="data.total > data.achievements.length && !data.loading"
                    @click="getAchievementsList"
                />
                <Button v-if="data.loading" class="light loader" :loading="true" />
            </div>
        </div>

        <div class="button-box">
            <Button
                :name="t('pages.achievements.redeem')"
                class="secondary"
                @click="redeem"/>
        </div>
    </template>
</template>

<script setup>
    import { onBeforeUnmount, onMounted, reactive, watch } from 'vue';
    import { useI18n } from 'vue-i18n';
    import Button from '@/components/forms/Button.vue';
    import EmptyLabel from '@/components/forms/EmptyLabel.vue';
    import Loader from '@/components/forms/Loader.vue';
    import { mapActions, mapMutations, mapState } from '@/map-state';
    import { delay } from '@/utils/utils';

    const { t } = useI18n();
    const { user, settings, ready } = mapState();
    const { openModal } = mapMutations();
    const { getMyAchievements, me } = mapActions();
    const { pixiRedeem, disableRecursionLogo, enableRecursionLogo } = mapState();

    const data = reactive({
        achievements: [],
        total: 0,
        loading: true
    });

    const redeem = (e) => {
        openModal({
            name: 'achievement-redeem-code',
            callback: (payload) => {
                if (payload) {
                    if (pixiRedeem?.value) {
                        pixiRedeem.value({ y : e.pageY, x : e.pageX });
                    }

                    if (window.navigator?.vibrate) {
                        window.navigator.vibrate(200);
                    }
                }
            }
        });
    };

    const getAchievementsList = async () => {
        data.loading = true;
        await delay(400);

        // const payload = await getMyAchievements({
        //     skip: data.achievements.length,
        //     take: +settings.value.ACHIEVEMENTS_DEFAULT_TAKE || 30
        // });

        // if (payload?.total) {
        //     data.total = payload.total;
        // }

        data.loading = false;
    };

    watch(
        () => ready.value,
        async () => {
            if (ready.value) {
                if (enableRecursionLogo?.value) {
                    enableRecursionLogo.value();
                }
                // await me();
                getAchievementsList();
            }
        }
    );

    onMounted(async () => {
        if (ready.value) {
            if (enableRecursionLogo?.value) {
                enableRecursionLogo.value();
            }
            // await me();
            getAchievementsList();
        }
    });

    onBeforeUnmount(async () => {
        console.log(disableRecursionLogo)
        if (disableRecursionLogo?.value) {
            disableRecursionLogo.value();
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

        & > .empty {
            margin: auto;
        }

        .achievements-list {
            display: flex;
            gap: 24px;
            flex-direction: column;
            padding-bottom: 24px;

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
                }
            }

            & > button {
                margin: 0 auto;
            }
        }
    }

    .button-box {
        padding: 12px 10px;
        flex-shrink: 0;
        position: sticky;
        bottom: 0;
        margin-top: auto;
        display: flex;
        flex-direction: column;
        gap: 8px;

        button {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 8px;
        }
    }
</style>
