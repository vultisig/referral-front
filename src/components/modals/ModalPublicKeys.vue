<template>
    <BaseModal
        name="public-keys"
        @close="close"
    >
        <template v-slot:title>
            <span v-html="t('modals.public-keys.title')"></span>
        </template>
        <template v-slot:content>
            <div class="content-box">
                <template v-if="user.profile.wallet_public_key_ecdsa">
                    <div class="description">
                        <b class="g-c">ECDSA Key:</b>
                        <span>{{ user.profile.wallet_public_key_ecdsa }}</span><br>
                        <b class="g-c">EdDSA Key:</b>
                        <span>{{ user.profile.wallet_public_key_eddsa }}</span>
                    </div>
                </template>

                <div class="buttons">
                    <Button :name="t('common.close')" class="secondary" @click="close"/>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import Button from '@/components/forms/Button.vue';
import BaseModal from '@/components/modals/BaseModal.vue';
import { mapState, mapMutations } from '@/map-state';

const { t } = useI18n();
const { closeModal } = mapMutations();
const { user } = mapState();

const close = () => {
    closeModal('public-keys');
};
</script>

<style lang="scss" scoped>
    .content-box {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px 0;
    }

    .description {
        @include font-b;
        color: $black-2;
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex-shrink: 0;
        padding: 0;
        align-items: start;
        span {
            white-space: normal;
            max-width: 100%;
            word-wrap: break-word;
        }
    }

    .buttons {
        display: flex;
        flex-direction: column;
        padding: 0;
        gap: 20px;
    }
</style>
