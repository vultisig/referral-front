import { _ as _export_sfc, u as useI18n, m as mapState, a as mapMutations, c as computed, r as resolveComponent, b as unref, o as openBlock, d as createElementBlock, e as createVNode, f as createBaseVNode, t as toDisplayString, F as Fragment, B as Button, g as createCommentVNode } from './index.30c48679.js';
import { A as Avatar } from './Avatar.38f9f359.js';
import { E as EmptyLabel } from './EmptyLabel.bb08cc72.js';

const Home_vue_vue_type_style_index_0_scoped_933e9cdf_lang = '';

const _hoisted_1 = {
  key: 0,
  class: "page-container"
};
const _hoisted_2 = ["src"];
const _hoisted_3 = { class: "button-box" };
const _hoisted_4 = { class: "stats" };
const _hoisted_5 = ["innerHTML"];
const _hoisted_6 = ["innerHTML"];
const _hoisted_7 = ["innerHTML"];
const _hoisted_8 = ["innerHTML"];
const _hoisted_9 = ["innerHTML"];
const _hoisted_10 = { class: "button-box" };

    
const _sfc_main = {
  __name: 'Home',
  setup(__props) {

    const { t } = useI18n();
    const { user } = mapState();
    const { openModal } = mapMutations();

    const emptyImg = computed(() => {
        const path = `/img/problems.svg`;
        return new URL(path, import.meta.url).href;
    });
    
    const viewWallet = () => {
        const params = [
            `public_key_ecdsa=${user.value.profile?.wallet_public_key_ecdsa}`,
            `public_key_eddsa=${user.value.profile?.wallet_public_key_eddsa}`
        ].join('&');

        if (window.Telegram?.WebApp) {
            window.Telegram?.WebApp.openLink("https://airdrop.vultisig.com?source=vultisigbot" + `&${params}`);
        } else {
            window.open("https://airdrop.vultisig.com?source=vultisigbot" + `&${params}`, '_blank');
        }
    };

    const openWallet = () => {
        openModal('wallet');
    };


return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (unref(user).profile.id)
    ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(Avatar, {
          name: unref(user).profile.first_name,
          class: "big"
        }, null, 8 /* PROPS */, ["name"]),
        createBaseVNode("h1", null, toDisplayString(unref(user).profile.username), 1 /* TEXT */),
        (!unref(user).profile.wallet_public_key_ecdsa)
          ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createVNode(EmptyLabel, {
                title: unref(t)('pages.home.wallet.empty.title'),
                description: unref(t)('pages.home.wallet.empty.description')
              }, null, 8 /* PROPS */, ["title", "description"]),
              createBaseVNode("img", {
                class: "home-img",
                src: emptyImg.value
              }, null, 8 /* PROPS */, _hoisted_2),
              createBaseVNode("div", _hoisted_3, [
                createVNode(Button, {
                  name: unref(t)('pages.home.wallet.add'),
                  class: "secondary",
                  onClick: openWallet
                }, null, 8 /* PROPS */, ["name"])
              ])
            ], 64 /* STABLE_FRAGMENT */))
          : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("ul", _hoisted_4, [
                createBaseVNode("li", null, [
                  createVNode(_component_Icon, { icon: "referrals-secondary" }),
                  createBaseVNode("div", null, [
                    createBaseVNode("span", {
                      innerHTML: unref(t)('pages.home.stats.refferals')
                    }, null, 8 /* PROPS */, _hoisted_5),
                    createBaseVNode("span", null, toDisplayString(unref(user).profile.referrals_count), 1 /* TEXT */)
                  ])
                ]),
                (unref(user).vasProfile?.uid)
                  ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                      createBaseVNode("li", null, [
                        createVNode(_component_Icon, { icon: "wallet" }),
                        createBaseVNode("div", null, [
                          createBaseVNode("span", {
                            innerHTML: unref(t)('pages.home.stats.name')
                          }, null, 8 /* PROPS */, _hoisted_6),
                          createBaseVNode("span", null, toDisplayString(unref(user).vasProfile.name), 1 /* TEXT */)
                        ])
                      ]),
                      createBaseVNode("li", null, [
                        createVNode(_component_Icon, { icon: "verified" }),
                        createBaseVNode("div", null, [
                          createBaseVNode("span", {
                            innerHTML: unref(t)('pages.home.stats.joined.title')
                          }, null, 8 /* PROPS */, _hoisted_7),
                          createBaseVNode("span", null, toDisplayString(unref(user).vasProfile.join_airdrop ? unref(t)('pages.home.stats.joined.yes') : unref(t)('pages.home.stats.joined.no')), 1 /* TEXT */)
                        ])
                      ]),
                      (unref(user).vasProfile?.join_airdrop)
                        ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                            createBaseVNode("li", null, [
                              createVNode(_component_Icon, { icon: "rank" }),
                              createBaseVNode("div", null, [
                                createBaseVNode("span", {
                                  innerHTML: unref(t)('pages.home.stats.rank')
                                }, null, 8 /* PROPS */, _hoisted_8),
                                createBaseVNode("span", null, "#" + toDisplayString(unref(user).vasProfile.rank), 1 /* TEXT */)
                              ])
                            ]),
                            createBaseVNode("li", null, [
                              createVNode(_component_Icon, { icon: "coin" }),
                              createBaseVNode("div", null, [
                                createBaseVNode("span", {
                                  innerHTML: unref(t)('pages.home.stats.farmed.title')
                                }, null, 8 /* PROPS */, _hoisted_9),
                                createBaseVNode("span", null, toDisplayString(unref(user).vasProfile.total_points) + " " + toDisplayString(unref(t)('pages.home.stats.farmed.points')), 1 /* TEXT */)
                              ])
                            ])
                          ], 64 /* STABLE_FRAGMENT */))
                        : createCommentVNode("v-if", true)
                    ], 64 /* STABLE_FRAGMENT */))
                  : createCommentVNode("v-if", true)
              ]),
              createBaseVNode("div", _hoisted_10, [
                createVNode(Button, {
                  name: unref(t)('pages.home.wallet.view'),
                  class: "secondary",
                  onClick: viewWallet
                }, null, 8 /* PROPS */, ["name"])
              ])
            ], 64 /* STABLE_FRAGMENT */))
      ]))
    : createCommentVNode("v-if", true)
}
}

};
const Home = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-933e9cdf"],['__file',"/home/runner/work/referral-front/referral-front/src/pages/Home.vue"]]);

export { Home as default };
