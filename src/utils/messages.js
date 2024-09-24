import { v4 as uuidv4 } from 'uuid';
import { store } from '@/store';

const initConfig = {
    delay: 2500
};

export default {
    error(text, config = {}) {
        store.commit('setMessages', {
            type: 'error',
            text,
            config: {
                ...initConfig,
                ...config
            },
            id: uuidv4()
        });
    }
};
