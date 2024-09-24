import i18n from '../i18n';
import { message } from '@/utils/utils';

const { t } = i18n.global;

export const ROUTER_ERRORS = [
    {
        code: ['fetch', 'load', 'dynamically', 'importing'],
        action: () => message.error(t('common.errors.importError'))
    }
];
