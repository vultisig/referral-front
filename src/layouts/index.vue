<template>
    <link rel="stylesheet" :href="`/themes/${theme}.css`" />
    <Pixi @ready="ready" />
    <div class="layout">
        <Circle top="0" left="0" class="move-1" />
        <Circle right="0" bottom="0" class="move-2"/>

        <div id="page">
            <RouterView />
            <Modals />
        </div>
        <Navigation />
    </div>
    <Messages />
</template>

<script setup>
import { onMounted } from 'vue';
import Navigation from '@/components/custom/Navigation.vue';
import Circle from '@/components/forms/Circle.vue';
import Messages from '@/components/forms/Messages.vue';
import Pixi from '@/components/forms/Pixi.vue';
import Modals from '@/components/modals/Modals.vue';
import { mapActions, mapMutations, mapState } from '@/map-state';
import router from '@/router';
import { initTg } from '@/utils/tg';

const { theme, user } = mapState();
const { openModal, closeModal, setReady } = mapMutations();
const { login, getSettings, getVASUser, putUserToVAS } = mapActions();

const ready = async () => {
    // Login
    await login();

    // Get Settings
    await getSettings();

    if (!user.value?.token) {
        if (['access-denied'].indexOf(router?.currentRoute?.value?.name) === -1) {
            router.push({ name: 'error' });
        }
        return;
    }

    // Get Wallet info
    if (user.value?.profile?.wallet_public_key_ecdsa && user.value?.profile?.wallet_public_key_eddsa) {
        await getVASUser();

        if (!user.value?.vasProfile?.uid) {
            const payload = await putUserToVAS();

            if (payload) {
                // Reload VAS USER
                await getVASUser();
            }
        }
    }

    // End we are ready
    setTimeout(() => {
        setReady(true);
        closeModal('loader');
    }, 1000);
};

onMounted(async () => {
    initTg();

    openModal('loader');
});
</script>

<style scoped lang="scss">
.layout {
    display: flex;
    background: $black;
    color: $white;
    flex: 1 1 100%;
    height: 100%;
    flex-direction: column;
    max-height: var(--tg-viewport-height);
    overflow: hidden;

    #page {
        flex: 1 1 1%;
        padding: 0;
        display: flex;
        flex-direction: column;
        overflow: auto;
        z-index: 2;

        .page-container {
            position: relative;
            display: flex;
            flex-direction: column;
            flex: 1 1;
            overflow: auto;
            @include scrollbar();
        }
    }
}
</style>
