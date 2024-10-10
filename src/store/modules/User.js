import { onRequestDefaultError, requests } from '@/utils/requests';
import { delay } from '@/utils/utils';
import i18n from '@/i18n';
import axios from 'axios';

const { t } = i18n.global;

const state = () => ({
    profile: {},
    vasProfile: {},
    token: null
});

const actions = {
    async login({ commit }) {
        if (!window.Telegram?.WebApp) {
            await delay(1500);
        }

        const tg_init_data = window.Telegram?.WebApp?.initData;
        let ref = null;

        (window.Telegram.WebApp?.initDataUnsafe?.start_param || '').split('&').forEach(item => {
            if (item.toLowerCase().includes('ref_')) {
                ref = item.toLowerCase().split('ref_')[1];
            }
        });

        try {
            const auth = await this.$http({
                method: 'POST',
                url: '/auth',
                data: { tg_init_data, ref },
                signal: requests.login.signal()
            });

            if (auth.status === 200) {
                const { data } = auth;
                commit('setToken', data.token);
                commit('setUser', data.user);
            } else {
                onRequestDefaultError({ response: auth });
            }
        } catch (e) {
            await delay(1500);

            onRequestDefaultError(e);
        }
    },
    async updateWallet({ commit }, data) {
        try {
            const result = await this.$http({
                method: 'POST',
                url: '/user/changeWallet',
                signal: requests.wallet.signal(),
                data
            });

            if (result.status === 200) {
                const { data } = result;
                commit('setUser', data);
            }
        } catch (e) {
            onRequestDefaultError(e);
        }
    },
    async putUserToVAS({ commit }) {
        try {
            await this.$http({
                method: 'POST',
                url: '/external-api/putUserToVAS',
                signal: requests.putUserToVAS.signal()
            });

            return true;
        } catch (e) {
            if (e.status === 400) {
                return true;
            } else {
                onRequestDefaultError(e);
            }
        }
    },
    async getVASUser({ commit }) {
        try {
            const result = await this.$http({
                method: 'GET',
                url: '/external-api/getVASUser',
                signal: requests.getVASUser.signal()
            });

            if (result.status === 200) {
                commit('setVASProfile', result.data);
            }
        } catch (e) {
            onRequestDefaultError(e);
        }
    },
    async checkAirdropStatus({ commit }, uuid) {
        try {
            const result = await this.$http({
                method: 'POST',
                url: '/external-api/checkStatus',
                signal: requests.checkAirdropStatus.signal(uuid),
                data: { uuid }
            });

            if (result.status === 200) {
                return true;
            }
        } catch (e) {
            if (e.status === 400) {
                return true;
            }
        }
    },
    async joinAirdrop({ commit }) {
        try {
            const result = await this.$http({
                method: 'POST',
                url: '/external-api/join',
                signal: requests.joinAirdrop.signal()
            });

            if (result.status === 200) {
                return true;
            }
        } catch (e) {
            if (e.status === 400) {
                return true;
            } else {
                onRequestDefaultError(e);
            }
        }
    },
    async me({ commit }) {
        try {
            const result = await this.$http({
                method: 'GET',
                url: '/user/me',
                signal: requests.me.signal()
            });

            if (result.status === 200) {
                const { data } = result;
                commit('setUser', data);
            }
        } catch (e) {
            onRequestDefaultError(e);
        }
    },
    async getReferrals({ commit }, payload) {
        try {
            const response = await this.$http({
                method: 'POST',
                url: '/user/referrals/',
                data: payload,
                signal: requests.referrals.signal()
            });

            if (response.status === 200) {
                return response.data;
            }

            return response.data;
        } catch (e) {
            onRequestDefaultError(e);
        }
    }
};

const getters = {};

const mutations = {
    setVASProfile(state, payload) {
        state.vasProfile = payload;
    },
    setToken(state, payload) {
        state.token = payload;
    },
    setUser(state, payload) {
        state.profile = payload;
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
