import { createStore } from 'vuex';
import leaderboard from '@/store/modules/Leaderboard';
import user from '@/store/modules/User';
import achievement from '@/store/modules/Achievement';
import { onRequestDefaultError, requests } from '@/utils/requests';
import { delay } from '@/utils/utils';

const state = () => ({
    theme: 'theme.default',
    modals: [],
    messages: [],
    pixiRedeem: null,
    enableBG: null,
    disableBG: null,
    enableRecursionLogo: null,
    disableRecursionLogo: null,

    ready: false,
    settings: {}
});

const actions = {
    async getSettings({ commit }) {
        try {
            const result = await this.$http({
                method: 'GET',
                url: '/settings',
                signal: requests.settings.signal()
            });

            if (result?.status === 200) {
                const { data } = result;
                commit('setSettings', data);
            }
        } catch (e) {
            await delay(1500);
            onRequestDefaultError(e);
        }
    }
};

const getters = {
    getModalData: (state) => (name) => state.modals.find((modal) => modal.name === name)?.data
};

const mutations = {
    setSettings(state, payload) {
        state.settings = payload;
    },
    setReady(state, payload) {
        state.ready = payload;
    },
    setDisableBG(state, payload) {
        state.disableBG = payload;
    },
    setEnableBG(state, payload) {
        state.enableBG = payload;
    },
    setPixiRedeem(state, payload) {
        state.pixiRedeem = payload;
    },
    setDisableRecursionLogo(state, payload) {
        state.disableRecursionLogo = payload;
    },
    setEnableRecursionLogo(state, payload) {
        state.enableRecursionLogo = payload;
    },
    openModal(state, payload) {
        if (typeof payload == 'string') {
            payload = {
                name: payload
            };
        }
        if (state.modals.find((modal) => modal.name === payload.name)) {
            return;
        }
        state.modals.push({
            name: payload.name,
            data: payload.data,
            callback: payload.callback
        });
    },
    closeModal(state, payload) {
        if (typeof payload == 'string') {
            payload = {
                name: payload
            };
        }

        const modal = state.modals.find((modal) => modal.name === payload.name);
        if (modal) {
            if (modal.callback) {
                modal.callback(payload.data);
            }
            state.modals.splice(state.modals.indexOf(modal), 1);
        }
    },
    setMessages(state, message) {
        state.messages.push(message);

        const timerId = setTimeout(() => {
            const idx = state.messages.findIndex((el) => el.id === message.config.id);
            state.messages.splice(idx, 1);
            clearTimeout(timerId);
        }, message.config.delay);

        if (window.navigator?.vibrate) {
            window.navigator.vibrate(100);
        }
    }
};

export const store = createStore({
    state,
    actions,
    getters,
    mutations,
    modules: {
        achievement,
        leaderboard,
        user
    }
});
