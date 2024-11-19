import { onRequestDefaultError } from '@/utils/requests';
import i18n from '@/i18n';
import axios from 'axios';
import { message } from '@/utils/utils';

const { t } = i18n.global;

const state = () => ({
    totalBalance: 0,
    totalLP: 0,
    totalVaultCount: 0
});

const actions = {
    async getLeaderboardItems({ commit }, { from, limit }) {
        try {
            // Temp
            const result = await fetch(`${import.meta.env.VITE_APP_AIRDROP_API}vaults?from=${from}&limit=${limit}`);
            const data = await result.json();
            commit('setLeaderboardInfo', data);
        } catch (e) {
            onRequestDefaultError(e);
        }
    }
};

const getters = {};

const mutations = {
    setLeaderboardInfo(state, payload) {
        state.totalBalance = payload?.total_balance;
        state.totalLP = payload?.total_lp;
        state.totalVaultCount = payload?.total_vault_count;
    }
};

export default {
    state,
    actions,
    getters,
    mutations
};
