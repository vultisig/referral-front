import { _ as _export_sfc, u as useI18n, m as mapState, r as reactive, k as resolveComponent, b as unref, o as openBlock, d as createElementBlock, e as createVNode, f as createBaseVNode, F as Fragment, l as renderList, h as createCommentVNode, B as Button, p as normalizeClass, g as createBlock, q as withCtx } from './index.b633f6b4.js';

const Airdrop_vue_vue_type_style_index_0_scoped_94566200_lang = '';

const _hoisted_1 = {
  key: 0,
  class: "page-container"
};
const _hoisted_2 = ["innerHTML"];
const _hoisted_3 = { class: "description" };
const _hoisted_4 = ["innerHTML"];
const _hoisted_5 = {
  key: 0,
  class: "spoilers"
};
const _hoisted_6 = ["onClick"];
const _hoisted_7 = ["innerHTML"];
const _hoisted_8 = ["innerHTML"];
const _hoisted_9 = { class: "social-box" };
const _hoisted_10 = { class: "button-box" };

    
const _sfc_main = {
  __name: 'Airdrop',
  setup(__props) {

    const { t, tm, rt } = useI18n();
    const { user } = mapState();

    const qa = tm('pages.airdrop.qa').map(item => ({
        q: rt(item.q),
        a: rt(item.a)
    }));

    const data = reactive({
        editMode: false,
        walletAddress: null,
        loading: false,
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
        ],
        qa: qa || []
    });

    const openSocial = (item) => {
        if (window.Telegram?.WebApp) {
            window.Telegram?.WebApp.openLink(item.url);
        } else {
            window.open(item.url, '_blank');
        }
    };

    const openDoc = () => {
        if (window.Telegram?.WebApp) {
            window.Telegram?.WebApp.openLink("https://docs.vultisig.com/vultisig-token/airdrop?source=vultiref");
        } else {
            window.open("https://docs.vultisig.com/vultisig-token/airdrop?source=vultiref", '_blank');
        }
    };

return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (unref(user).profile.id)
    ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_Icon, { icon: "airdrop-secondary" }),
        createBaseVNode("h1", {
          innerHTML: unref(t)('pages.airdrop.title')
        }, null, 8 /* PROPS */, _hoisted_2),
        createBaseVNode("label", _hoisted_3, [
          createBaseVNode("span", {
            innerHTML: unref(t)('pages.airdrop.description.intro')
          }, null, 8 /* PROPS */, _hoisted_4)
        ]),
        (data.qa?.length)
          ? (openBlock(), createElementBlock("ul", _hoisted_5, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(data.qa, (item, id) => {
                return (openBlock(), createElementBlock("li", {
                  key: id,
                  class: normalizeClass({ opened: item.opened })
                }, [
                  createBaseVNode("button", {
                    type: "button",
                    onClick: $event => (item.opened = !item.opened)
                  }, [
                    createBaseVNode("span", {
                      innerHTML: item.q
                    }, null, 8 /* PROPS */, _hoisted_7),
                    createVNode(_component_Icon, { icon: "arrow" })
                  ], 8 /* PROPS */, _hoisted_6),
                  createBaseVNode("div", {
                    innerHTML: item.a
                  }, null, 8 /* PROPS */, _hoisted_8)
                ], 2 /* CLASS */))
              }), 128 /* KEYED_FRAGMENT */))
            ]))
          : createCommentVNode("v-if", true),
        createBaseVNode("div", _hoisted_9, [
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
        ]),
        createBaseVNode("div", _hoisted_10, [
          createVNode(Button, {
            name: unref(t)('pages.airdrop.readmore'),
            class: "secondary",
            onClick: openDoc
          }, null, 8 /* PROPS */, ["name"])
        ])
      ]))
    : createCommentVNode("v-if", true)
}
}

};
const Airdrop = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-94566200"],['__file',"/home/runner/work/referral-front/referral-front/src/pages/Airdrop.vue"]]);

export { Airdrop as default };
