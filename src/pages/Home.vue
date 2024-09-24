<template>
    <div class="page-container" v-if="user.profile.id">
        <Avatar :name="user.profile.first_name" class="big"/>
        <h1>{{ user.profile.username }}</h1>

        <template v-if="!user.profile.wallet_public_key_ecdsa">
            <EmptyLabel
                :title="t('pages.home.wallet.empty.title')"
                :description="t('pages.home.wallet.empty.description')" />
        </template>

        <img class="home-img" :src="emptyImg" />

        <template v-if="user.profile.wallet_public_key_ecdsa">
            <div class="description">
                <b class="g-c">ECDSA Key:</b>
                <span>{{ user.profile.wallet_public_key_ecdsa }}</span><br>
                <b class="g-c">EdDSA Key:</b>
                <span>{{ user.profile.wallet_public_key_eddsa }}</span>
            </div>
        </template>

        <div class="button-box">
            <Button
                :name="user.profile.wallet_public_key_ecdsa ? t('pages.home.wallet.edit') : t('pages.home.wallet.add')"
                class="secondary"
                @click="openWallet"
            />
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { useI18n } from 'vue-i18n';
    import Avatar from '@/components/forms/Avatar.vue';
    import Button from '@/components/forms/Button.vue';
    import EmptyLabel from '@/components/forms/EmptyLabel.vue';
    import { mapMutations, mapState } from '@/map-state';

    const { t } = useI18n();
    const { user } = mapState();
    const { openModal } = mapMutations();

    const emptyImg = computed(() => {
        const path = `${import.meta.env.VITE_APP_BASE_URL}/img/problems.svg`;
        return new URL(path, import.meta.url).href;
    });

    const openWallet = () => {
        openModal('wallet');
    };

</script>

<style lang="scss" scoped>
    .page-container {
        gap: 14px;
        padding: 60px 10px 0;
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
            width: 220px;
            height: 220px;
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

        .button-box {
            padding: 12px 0;
            // background-color: $black;
            // box-shadow: 0px 4px 12px 4px $black;
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
