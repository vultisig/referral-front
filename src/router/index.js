import { createRouter, createWebHistory } from 'vue-router';
// import { ROUTER_ERRORS } from '@/constants';
import { message } from '@/utils/utils';

import { requests } from '@/utils/requests';

const handleRouterError = (error) => {
    message.error(error.message);
    // const errorWords = error.message.toLowerCase().split(' ');
    // const action = ROUTER_ERRORS.find((item) => item.code.some((r) => errorWords.indexOf(r) !== -1));
    // if (action) {
    //     return action.action();
    // }
};

const goHome = (to, from, next) => {
    next({ name: 'home' });
};

const routes = [
    {
        path: '/home',
        name: 'home',
        component: () => import('../pages/Home.vue'),
        abort: []
    },
    {
        path: '/referrals',
        name: 'referrals',
        component: () => import('../pages/Referrals.vue'),
        abort: [
            'referrals'
        ]
    },
    {
        path: '/achievements',
        name: 'achievements',
        component: () => import('../pages/Achievements.vue'),
        abort: [
            'achievements'
        ]
    },
    {
        path: '/airdrop',
        name: 'airdrop',
        component: () => import('../pages/Airdrop.vue'),
        abort: []
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import('../pages/Settings.vue'),
        abort: []
    },
    {
        path: '/error',
        name: 'error',
        component: () => import('../pages/Error.vue'),
        abort: []
    },
    {
        path: '/access-denied',
        name: 'access-denied',
        component: () => import('../pages/AccessDenied.vue'),
        abort: []
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'error-page',
        beforeEnter: goHome
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.back = function (path) {
    this.options?.history?.state?.back ? this.go(-1) : this.push(path || '/');
};

router.beforeEach((to, from, next) => {
    if (from?.name) {
        routes.forEach((item) => {
            if (item?.name === from?.name && item.abort?.length) {
                item.abort.forEach((code) => {
                    if (code.split(':id').length === 1) {
                        requests[code].abort();
                    } else {
                        requests[code.split(':id')[0]].abort(from.params.id);
                    }
                });
            }
        });
    }
    next();
});

router.onError(handleRouterError);

export default router;
