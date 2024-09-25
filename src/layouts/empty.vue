<template>
    <link rel="stylesheet" :href="`/themes/${theme}.css`" />

    <div class="layout">
        <Circle top="0" left="0" class="move-1" />
        <Circle right="0" bottom="0" class="move-2"/>

        <div id="page">
            <RouterView />
            <Modals />
        </div>
    </div>
    <Messages />
</template>

<script setup>
import { onMounted } from 'vue';
import Circle from '@/components/forms/Circle.vue';
import Messages from '@/components/forms/Messages.vue';
import Modals from '@/components/modals/Modals.vue';
import { mapActions, mapMutations, mapState } from '@/map-state';
import router from '@/router';
import { initTg } from '@/utils/tg';

const { theme, user } = mapState();
const { openModal, closeModal } = mapMutations();
const { login } = mapActions();

onMounted(async () => {
    initTg();

    openModal('loader');

    // Login
    await login();

    if (user.value?.token) {
        router.push({ name: 'home' });
        return;
    }

    closeModal('loader');
});
</script>

<style scoped lang="scss">
.layout {
    display: flex;
    background: $black;
    color: $white;
    flex: 1 1 100%;
    height: 100%;
    max-height: var(--tg-viewport-height);
    overflow: hidden;

    #page {
        flex: 1 1;
        padding: 0;
        display: flex;
        flex-direction: column;
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
