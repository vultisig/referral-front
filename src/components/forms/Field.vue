<template>
    <div :class="[props.icon ? 'with-icon' : '']">
        <p>
            <input
                ref="field"
                :type="data.type"
                :name="props.name"
                :min="props.min"
                :max="props.max"
                :maxlength="props.maxlength"
                :disabled="props.disabled"
                :placeholder="props.placeholder"
                :autocomplete="autocomplete"
                :readonly="props.readonly"
                @input="onInput"
                @keyup.enter="onPressEnter"
            />
            <Icon v-if="props.icon" :icon="props.icon" />

            <div class="actions-block">
                <IconButton
                    v-if="props.type === 'password' && data.type === 'password'"
                    tabindex="-1"
                    icon="eye-closed"
                    class="secondary small"
                    :name="t('forms.field.showPassword')"
                    @click="showPassword"
                />
    
                <IconButton
                    v-else-if="props.type === 'password' && data.type === 'text'"
                    tabindex="-1"
                    icon="eye-opened"
                    class="secondary small"
                    :name="t('forms.field.hidePassword')"
                    @click="hidePassword"
                />
    
                <IconButton
                    v-else-if="props.clearable && !props.readonly"
                    tabindex="-1"
                    icon="clean"
                    class="secondary small clean"
                    :name="t('forms.field.clear')"
                    @click="clean"
                />

                <Icon v-if="props.info" icon="info" class="icon-info" :title="props.info" />
            </div>
        </p>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import IconButton from '@/components/forms/IconButton.vue';

const props = defineProps({
    icon: { type: String, default: '' },
    value: { type: [String, Number], default: '' },
    name: { type: [String, Number], default: '' },
    id: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    type: { type: String, default: 'text' },
    maxlength: { type: [Number, null], default: null },
    max: { type: Number, default: null },
    min: { type: Number, default: null },
    disabled: { type: Boolean, default: false },
    autocomplete: { type: String, default: 'off' },
    readonly: { type: Boolean, default: false },
    clearable: { type: Boolean, default: true },
    info: { type: [String, Boolean], default: false }
});

const { t } = useI18n();

const field = ref(null);

const data = reactive({
    type: props.type
});

const emit = defineEmits(['change', 'pressEnter']);

defineExpose({ field });

const showPassword = () => {
    data.type = 'text';
};

const hidePassword = () => {
    data.type = 'password';
};

const clean = () => {
    field.value.value = '';
    setTimeout(() => {
        onInput({ target: field.value });
        field.value.focus();
    });
};

onMounted(() => {
    if (props.value !== null) {
        field.value.value = props.value;
    }
});

const onPressEnter = (evn) => {
    onInput(evn);
    emit('pressEnter');
};

const onInput = (evn) => {
    if (!evn?.target) {
        return;
    }

    if (['.', ',', '-'].includes(evn.data)) {
        if (!evn.target.value) {
            emit('change', evn);
        }
        return;
    }

    let value = evn.target.value.trimStart();

    if (value) {
        if (typeof props.min === 'number') {
            if (parseFloat(value, 10) < props.min || Number.isNaN(parseInt(value, 10))) {
                value = props.min;
            }
        }
        if (typeof props.max === 'number') {
            if (parseFloat(value, 10) > props.max) {
                value = props.max;
            }
        }
    } else {
        value = '';
    }

    evn.target.value = value;

    setTimeout(() => {
        if (evn.target && evn.target.value !== value) {
            evn.target.value = value;
        }
    });

    emit('change', evn);
};
</script>

<style lang="scss" scoped>
div {
    & > p {
        margin: 0;
        display: flex;
        position: relative;

        input {
            @include input;
        }

        .actions-block {
            position: absolute;
            display: flex;
            align-items: center;
            right: 8px;
            height: 100%;
        }

        svg {
            &.icon-info {
                fill: $persian-blue;
                width: 16px;
                height: 16px;
                cursor: pointer;

                &:hover {
                    fill: $turquoise;
                }
            }
            &:not(.icon-info) {
                position: absolute;
                left: 8px;
                top: 0px;
                color: $white;
                fill: $white;
            }
            height: 36px;
            width: 16px;
        }
    }

    &.with-icon {
        & > p {
            input {
                padding-left: 32px;
            }

            .placeholder {
                left: 32px;
            }
        }
    }

    &.light {
        & > p {
            input {
                padding-top: 8px;
                padding-bottom: 8px;
                height: 28px;
            }

            svg {
                height: 28px;
            }
        }
    }

    &.small {
        & > p {
            input {
                padding-top: 0;
                padding-bottom: 0;
                height: 24px;
            }

            svg {
                height: 24px;
            }
        }
    }
}
</style>
