<template>
    <ModalInvite v-if="modalIsOpened('invite')" />
    <ModalWallet v-if="modalIsOpened('wallet')" />
    <ModalPublicKeys v-if="modalIsOpened('public-keys')" />
    <ModalLoader v-if="modalIsOpened('loader')" />
</template>

<script setup>
import { reactive } from 'vue';
import ModalInvite from '@/components/modals/ModalInvite.vue';
import ModalPublicKeys from '@/components/modals/ModalPublicKeys.vue';
import ModalLoader from '@/components/modals/ModalLoader.vue';
import ModalWallet from '@/components/modals/ModalWallet.vue';
import { mapState } from '@/map-state';

const { modals } = reactive(mapState());

const modalIsOpened = (name) => !!modals.find((modal) => modal.name === name);
</script>
