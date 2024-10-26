<template>
    <button type="button" :title="props.name">
        <Icon :icon="props.icon" />
    </button>
</template>

<script setup>
const props = defineProps({
    icon: { type: String, default: '' },
    name: { type: String, default: '' }
});
</script>

<style lang="scss" scoped>
button {
    outline: none;
    height: 36px;
    width: 36px;
    gap: 0;
    display: flex;
    font-variant: unset;
    transition: all 0.4s;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;

    svg {
        width: 18px;
        height: 18px;
        fill: $turquoise;
    }

    &:hover {
        svg {
            fill: $persian-blue;
        }
    }

    &[disabled] {
        filter: grayscale(1);
        cursor: default;
        opacity: .2;
    }
}
</style>
