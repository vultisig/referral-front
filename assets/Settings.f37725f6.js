import { _ as _export_sfc, u as useI18n, m as mapState, a as mapMutations, i as reactive, r as resolveComponent, b as unref, o as openBlock, d as createElementBlock, e as createVNode, f as createBaseVNode, g as createCommentVNode, F as Fragment, p as renderList, k as createBlock, x as withCtx, B as Button } from './index.2601b65d.js';

const Settings_vue_vue_type_style_index_0_scoped_2ff6c9bb_lang = '';

const _hoisted_1 = {
  key: 0,
  class: "page-container"
};
const _hoisted_2 = ["innerHTML"];
const _hoisted_3 = { class: "params" };
const _hoisted_4 = { key: 0 };
const _hoisted_5 = ["innerHTML"];
const _hoisted_6 = ["innerHTML"];
const _hoisted_7 = ["innerHTML"];
const _hoisted_8 = { class: "social-box" };

    
const _sfc_main = {
  __name: 'Settings',
  setup(__props) {

    const { t } = useI18n();
    const { user } = mapState();
    const { openModal } = mapMutations();

    const data = reactive({
        socials: [
            {
                icon: 'x',
                url: 'https://twitter.com/vultisig'
            }, {
                icon: 'discord',
                url: 'https://discord.gg/54wEtGYxuv'
            }, {
                icon: 'telegram',
                url: 'https://t.me/vultisig'
            }, {
                icon: 'github',
                url: 'https://github.com/Vultisig'
            }
        ]
    });

    const install = () => {
        if (window.Telegram?.WebApp) {
            const url = 'https://vultisig.com/#store-section?source=bultisigbot';

            window.Telegram?.WebApp.openLink(url);
        }
    };

    const showPublicKeys = () => {
        openModal('public-keys');
    };

    const openWallet = () => {
        openModal('wallet');
    };

    const openSocial = (item) => {
        if (window.Telegram?.WebApp) {
            window.Telegram?.WebApp.openLink(item.url);
        } else {
            window.open(item.url, '_blank');
        }
    };

return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (unref(user).profile.id)
    ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_Icon, { icon: "settings-secondary" }),
        createBaseVNode("h1", {
          innerHTML: unref(t)('pages.settings.title')
        }, null, 8 /* PROPS */, _hoisted_2),
        createBaseVNode("ul", _hoisted_3, [
          (unref(user).profile?.wallet_public_key_ecdsa)
            ? (openBlock(), createElementBlock("li", _hoisted_4, [
                createBaseVNode("button", {
                  type: "button",
                  onClick: showPublicKeys
                }, [
                  createBaseVNode("span", {
                    innerHTML: unref(t)('pages.settings.wallet.info')
                  }, null, 8 /* PROPS */, _hoisted_5),
                  createVNode(_component_Icon, { icon: "arrow" })
                ])
              ]))
            : createCommentVNode("v-if", true),
          createBaseVNode("li", null, [
            createBaseVNode("button", {
              type: "button",
              onClick: openWallet
            }, [
              createBaseVNode("span", {
                innerHTML: unref(user).profile.wallet_public_key_ecdsa ? unref(t)('pages.settings.wallet.edit') : unref(t)('pages.settings.wallet.add')
              }, null, 8 /* PROPS */, _hoisted_6),
              createVNode(_component_Icon, { icon: "arrow" })
            ])
          ]),
          createBaseVNode("li", null, [
            createBaseVNode("button", {
              type: "button",
              onClick: install
            }, [
              createBaseVNode("span", {
                innerHTML: unref(t)('pages.settings.wallet.install')
              }, null, 8 /* PROPS */, _hoisted_7),
              createVNode(_component_Icon, { icon: "arrow" })
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_8, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(data.socials, (item, id) => {
            return (openBlock(), createBlock(Button, {
              key: id,
              class: "icon",
              onClick: $event => (openSocial(item))
            }, {
              default: withCtx(() => [
                createVNode(_component_Icon, {
                  icon: item.icon
                }, null, 8 /* PROPS */, ["icon"])
              ]),
              _: 2 /* DYNAMIC */
            }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["onClick"]))
          }), 128 /* KEYED_FRAGMENT */))
        ])
      ]))
    : createCommentVNode("v-if", true)
}
}

};
const Settings = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-2ff6c9bb"],['__file',"/home/runner/work/referral-front/referral-front/src/pages/Settings.vue"]]);

export { Settings as default };
