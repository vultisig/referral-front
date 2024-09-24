<template>
    <BaseModal
        name="invite"
        @close="close"
    >
        <template v-slot:title>
            <span v-html="t('modals.invite.title')"></span>
        </template>
        <template v-slot:content>
            <div class="canvas-box">
                <canvas id="qr-canvas"></canvas>
            </div>

            <div class="buttons">
                <Button :name="t('modals.invite.share')" @click="share"/>
                <Button :name="t('modals.invite.copy')" @click="copy"/>
                <Button :name="t('common.close')" class="secondary" @click="close"/>
            </div>
        </template>
    </BaseModal>
</template>

<script setup>
import QRCode from 'qrcode';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import Button from '@/components/forms/Button.vue';
import BaseModal from '@/components/modals/BaseModal.vue';
import { mapMutations, mapState } from '@/map-state';
import { copyText, message } from '@/utils/utils';

const { t } = useI18n();
const { closeModal } = mapMutations();
const { user } = mapState();

const close = () => {
    closeModal('invite');
};

const copy = () => {
    copyText(`https://t.me/vultirefbot/app?startapp=ref_${user.value.profile?.uuid}`);
    message.error(t('modals.invite.copied'));
};

const share = () => {
    if (window.Telegram?.WebApp) {
        const url = `https://telegram.me/share/url?url=https://t.me/vultirefbot/app?startapp=ref_${
            user.value.profile?.uuid
        }&text=Join me on VultiRef and let's get an airdrop together`;

        window.Telegram?.WebApp.openLink(url);
    }

    close();
};

const createQr = () => {
    const canvas = document.getElementById('qr-canvas');

    if (!canvas) {
        return;
    }

    QRCode.toCanvas(canvas, `https://t.me/vultirefbot/app?startapp=ref_${user.value.profile?.uuid}`, {
        color: {
            dark: '#0439C7',
            light: '#ffffff'
        },
        width: 256,
        height: 256
    });
};

onMounted(() => {
    createQr();
});

</script>

<style lang="scss" scoped>
    .canvas-box {
        width: 284px;
        height: 284px;
        margin: 0 auto;
        margin-top: 20px;
        border: dashed 4px $turquoise; 
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 30px;
        canvas {
            width: 256px;
            height: 256px;
            border-radius: 20px;
        }
    }

    .buttons {
        display: flex;
        flex-direction: column;
        padding: 20px 0;
        gap: 20px;
    }
</style>
