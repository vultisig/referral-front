import i18n from '@/i18n';
import router from '@/router';
import { message } from '@/utils/utils';

const { t } = i18n.global;
const controllers = {};

const signal = (name, id) => {
    const code = id ? `${name}_${id}` : name;

    if (controllers[code]) {
        controllers[code].abort();
    }

    controllers[code] = new AbortController();

    return controllers[code].signal;
};

const abort = (name) => {
    if (controllers[name]) {
        controllers[name].abort();
    }

    delete controllers[name];
};

const aborts = (name, id) => {
    if (id) {
        abort(`${name}_${id}`);
    } else {
        Object.keys(controllers)
            .filter((item) => item.indexOf(`${name}_`) === 0)
            .forEach((code) => {
                abort(code);
            });
    }
};

export const requests = {
    settings: {
        signal: () => signal('settings'),
        abort: () => abort('settings')
    },
    login: {
        signal: () => signal('login'),
        abort: () => abort('login')
    },
    me: {
        signal: () => signal('me'),
        abort: () => abort('me')
    },
    wallet: {
        signal: () => signal('wallet'),
        abort: () => abort('wallet')
    },
    referrals: {
        signal: () => signal('referrals'),
        abort: () => abort('referrals')
    },
    getVASUser: {
        signal: () => signal('getVASUser'),
        abort: () => abort('getVASUser')
    },
    putUserToVAS: {
        signal: () => signal('putUserToVAS'),
        abort: () => abort('putUserToVAS')
    },
    joinAirdrop: {
        signal: () => signal('joinAirdrop'),
        abort: () => abort('joinAirdrop')
    },
    checkAirdropStatus: {
        signal: (uuid) => signal('checkAirdropStatus', uuid),
        abort: (uuid) => abort('checkAirdropStatus', uuid)
    }
};

let showAuthErrorTimeout;

export const onRequestDefaultError = (e) => {
    if (e?.code !== 'ERR_CANCELED') {
        if (e?.code === 'ERR_NETWORK') {
            window.location.reload();
        } else if (e?.response?.status === 401) {
            clearTimeout(showAuthErrorTimeout);
            showAuthErrorTimeout = setTimeout(() => {
                message.error(t('utils.request.authError'));
            }, 200);

            if (router?.currentRoute?.value?.name !== 'error') {
                router.push({ name: 'error' });
            }
        } else if (e?.response?.status === 422) {
            if (router?.currentRoute?.value?.name !== 'access-denied') {
                router.push({ name: 'access-denied' });
            }
        } else if (e?.response?.status === 423) {
            message.error(e.response?.data?.message || t('utils.request.error'));
        } else {
            message.error(t('utils.request.error'));
        }
    }
};
