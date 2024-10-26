<template>
    <BaseModal
        name="achievement-redeem-code"
        @close="close"
    >
        <template v-slot:title>
            <span v-html="t('modals.achievement-redeem-code.title')"></span>
        </template>
        <template v-slot:content>
            <div class="content-box">
                <div class="field-box">
                    <Field
                        :disabled="data.loading"
                        :placeholder="$t('modals.achievement-redeem-code.placeholder')"
                        name="code"
                        @change="onInput"
                    />
                </div>

                <div class="buttons">
                    <Button v-if="data.loading" class="loader" :loading="true" />
                    <Button v-else :name="t('common.apply')"
                        :disabled="!data.value"
                        @click="apply" />
                    <Button :name="t('common.close')" class="secondary" @click="close"/>
                </div>
            </div>
        </template>
    </BaseModal>
</template>

<script setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import Field from '@/components/forms/Field.vue';
import Button from '@/components/forms/Button.vue';
import BaseModal from '@/components/modals/BaseModal.vue';
import { mapState, mapMutations, mapActions } from '@/map-state';
import { delay } from '@/utils/utils';

const { redeemAchievement } = mapActions();
const { t } = useI18n();
const { closeModal } = mapMutations();
const { user } = mapState();

const data = reactive({
    value: '',
    loading: false
});

const onInput = (e) => {
    data.value = (e.target?.value || '').trim();
}

const apply = async () => {
    data.loading = true;
    await delay(400);
    const result = await redeemAchievement(data.value);

    if (result) {
        closeModal({
            name: 'achievement-redeem-code',
            data: result
        });    
    }

    data.loading = false;
}

const close = () => {
    closeModal('achievement-redeem-code');
};
</script>

<style lang="scss" scoped>
    .content-box {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px 0;
    }

    .field-box {
        padding: 24px 0 48px;
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
