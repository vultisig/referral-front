import { onRequestDefaultError, requests } from '@/utils/requests';
import { delay } from '@/utils/utils';
import i18n from '@/i18n';
import axios from 'axios';
import { message } from '@/utils/utils';

const { t } = i18n.global;

const state = () => ({
});

const actions = {
    async redeemAchievement({ commit }, code) {
        try {
            const result = await this.$http({
                method: 'POST',
                url: '/achievement/apply',
                data: { code },
                signal: requests.redeemAchievement.signal()
            });

            if (result.status === 200) {
                return true;
            }
        } catch (e) {
            if (e.status === 424) {
                message.error(t('modals.achievement-redeem-code.errors.incorrect-code'));
            } else if (e.status === 423) {
                message.error(t('modals.achievement-redeem-code.errors.time-expired'));
            } else if (e.status === 420) {
                message.error(t('modals.achievement-redeem-code.errors.already-redeem'));
            } else {
                onRequestDefaultError(e);
            }
        }
    }
};

const getters = {};

const mutations = {};

export default {
    state,
    actions,
    getters,
    mutations
};
