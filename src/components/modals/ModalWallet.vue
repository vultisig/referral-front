<template>
    <BaseModal
        name="wallet"
        @close="close"
    >
        <template v-slot:title>
            <span v-html="t('modals.wallet.title')"></span>
        </template>
        <template v-slot:content>
            <canvas id="qwe"/>
            <Progress
                :value="data.value"
                :title="data.title"
                class="progress"
            />

            <div class="buttons">
                <Button :name="t('modals.wallet.install')" class="secondary" @click="install" :disabled="data.inProcess"/>
                <Button :name="t('modals.wallet.upload')" @click="upload" :disabled="data.inProcess"/>
                <Button :name="t('common.close')" class="secondary" @click="close" :disabled="data.inProcess"/>
            </div>
        </template>
    </BaseModal>
</template>

<script setup>
import qrcodeParser from 'qrcode-parser';
import { onMounted, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import Button from '@/components/forms/Button.vue';
import Progress from '@/components/forms/Progress.vue';
import BaseModal from '@/components/modals/BaseModal.vue';
import { mapActions, mapMutations } from '@/map-state';
import { delay, message } from '@/utils/utils';

const { t } = useI18n();
const { updateWallet } = mapActions();
const { closeModal } = mapMutations();

const data = reactive({
    value: 0,
    title: '',
    inProcess: false,
    steps: {
        intro: {
            value: 15,
            title: t('modals.wallet.steps.intro')
        },
        parse: {
            value: 35,
            title: t('modals.wallet.steps.unpacking')
        },
        update: {
            value: 55,
            title: t('modals.wallet.steps.update')
        },
        done: {
            value: 100,
            title: t('modals.wallet.steps.done')
        }
    }
});

const setStep = (code) => {
    if (!data.steps[code]) {
        return;
    }
    data.value = data.steps[code].value;
    data.title = data.steps[code].title;
};

const close = () => {
    if (data.inProcess) {
        return;
    }

    closeModal('wallet');
};

const update = async(payload) => {
    setStep('update');

    await updateWallet(payload);

    await delay(800);
    setStep('done');

    data.inProcess = false;
    await delay(100);
    close();
};

const uploadError = (img, mode) => {
    if (mode === 'default') {
        parseQR(img, 'invert');
        return;
    }

    data.inProcess = false;
    message.error(t('modals.wallet.errorqr'));
    setStep('intro');
};

const blackModes = {
    default: (grayscale) => grayscale < 127,
    invert: (grayscale) => grayscale > 200
}

const parseQR = (img, mode = 'default') => {
    const canvas = document.createElement('canvas');

    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0, img.width, img.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    function RGBToGrayScale(red,green,blue) {
        return (red * 6966 + green * 23436 + blue * 2366) >> 15;
    }

    const pixels = imageData.data;
    for (let i = 0; i < pixels.length; i += 4) {
        const red = pixels[i];
        const green = pixels[i + 1];
        const blue = pixels[i + 2];
        const grayscale = RGBToGrayScale(red, green, blue);
        
        if (blackModes[mode]  && blackModes[mode](grayscale)) {
            pixels[i] = 0;
            pixels[i + 1] = 0;
            pixels[i + 2] = 0;
        } else {
            pixels[i] = 255;
            pixels[i + 1] = 255;
            pixels[i + 2] = 255;
        }
    }

    ctx.putImageData(imageData, 0, 0);

    qrcodeParser(canvas.toDataURL('image/jpeg').split(';base64,')[1]).then((res) => {
        try {
            const result = JSON.parse(res);

            const payload = {
                wallet_uid: result.uid || result.a,
                wallet_public_key_ecdsa: result.public_key_ecdsa || result.c || result.publicKeyEcdsa,
                wallet_public_key_eddsa: result.public_key_eddsa || result.d || result.publicKeyEddsa,
                wallet_hex_chain_code: result.hex_chain_code || result.e || result.hexChainCode
            }

            if (!payload.wallet_public_key_ecdsa || !payload.wallet_public_key_eddsa) {
                uploadError(img, mode);
            } else {
                update(payload);
            }
        } catch (e) {
            uploadError(img, mode);
        }
    }).catch(() => {
        uploadError(img, mode);
    });
}

const upload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept='image/png, image/gif, image/jpeg';

    const img = document.createElement('img');
    // const canvas = document.createElement('canvas');

    input.onchange = async (e) => { 
        if (e.target.files.length == 0) {
            return;
        }

        data.inProcess = true;
        setStep('parse');
        const file = e.target.files[0];

        img.src = URL.createObjectURL(file);
        img.onload = async () => {
            await delay(1500);

            parseQR(img);
        };
    };

    input.click();
};

const install = () => {
    if (window.Telegram?.WebApp) {
        const url = 'https://vultisig.com/#store-section?source=vultiref';

        window.Telegram?.WebApp.openLink(url);
    }
};

onMounted(async () => {
    await delay(20);
    setStep('intro');
});
</script>

<style lang="scss" scoped>
    .progress {
        margin: 20px auto;
    }

    .buttons {
        display: flex;
        flex-direction: column;
        padding: 20px 0;
        gap: 20px;
    }
</style>
