<template>
    <span>{{ props.name?.length ? props.name[0] : '-' }}</span>
</template>

<script setup>
const props = defineProps({
    name: { type: String, default: '' }
});
</script>

<style lang="scss" scoped>
span {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 30px;
    background: linear-gradient(143deg, $turquoise, $persian-blue);
    @include font-h2;
    color: $white;
    border-radius: 50%;
    text-transform: uppercase;

    &.big {
        width: 94px;
        height: 94px;
        background-color: $persian-blue;
        font-size: 52px;
    }
}
</style>
