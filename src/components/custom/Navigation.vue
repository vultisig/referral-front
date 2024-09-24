<template>
    <ul>
        <li v-for="item in data.items" :key="item.name">
            <router-link
                :class="{ active: route.path.indexOf(item.link) === 0 }"
                :to="item.link"
                :title="item.name"
            >
                <Icon :icon="item.icon" />
                <span>{{ item.name }}</span>
            </router-link>
        </li>
    </ul>
</template>

<script setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const route = useRoute();
const { t } = useI18n();

const data = reactive({
    items: [{
        icon: 'home',
        link: '/home',
        name: t('nav.home')
    }, {
        icon: 'referrals',
        link: '/referrals',
        name: t('nav.referrals')
    }, {
        icon: 'airdrop',
        link: '/airdrop',
        name: t('nav.airdrop')
    }]
});
</script>

<style lang="scss" scoped>
ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    margin: 0;
    flex-shrink: 0;
    z-index: 1;
    background: $black-0;

    li {
        display: flex;
        flex: 1 1;
        a {
            height: 54px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            flex: 1 1 100%;
            align-items: center;
            justify-content: center;
            opacity: .6;

            svg {
                fill: $white;
                width: 18px;
                height: 18px;
            }
            span {
                @include font-label;
                color: $white;
            }

            &.active {
                opacity: 1;
            }
        }
    }
}
</style>
