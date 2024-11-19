import { _ as _export_sfc, r as reactive, c as computed, w as watch, o as onMounted, a as resolveComponent, b as openBlock, d as createElementBlock, e as createStaticVNode, f as createCommentVNode, g as createBaseVNode, F as Fragment, h as renderList, i as createBlock, n as numberWithSpaces, j as delay, u as useI18n, m as mapState, k as mapMutations, l as unref, p as createVNode, t as toDisplayString, B as Button } from './index.b3a07228.js';
import { A as Avatar } from './Avatar.85a85724.js';
import { E as EmptyLabel } from './EmptyLabel.8348668e.js';

const BigCounter_vue_vue_type_style_index_0_scoped_46cfe4f1_lang = '';

const _hoisted_1$1 = { key: 0 };
const _hoisted_2$1 = ["innerHTML"];
const _hoisted_3$1 = { class: "value" };
const _hoisted_4$1 = { key: 1 };
const _hoisted_5$1 = { class: "total" };
const _hoisted_6$1 = { key: 1 };

    
const _sfc_main$1 = {
  __name: 'BigCounter',
  props: {
        title: { type: [String, null], default: null },
        value: { type: [Number], default: 0 },
        total: { type: [Number], default: 0 }
    },
  setup(__props) {

    const props = __props;

    const data = reactive({
        value: 0,
        total: 0
    });

    const valueItems = computed(() => {
        return numberWithSpaces(parseInt(data.value)).replace(/,/g, ' ').split('');
    });

    const totalItems = computed(() => {
        return numberWithSpaces(parseInt(data.total)).replace(/,/g, ' ').split('');
    });

    const updateValue = async () => {
        let steps = 14;
        const letters = ((data.value).toString().split('.')[1] || '').length;
        const diff = +((props.value - data.value) / steps).toFixed(letters);

        const doIt = async () => {
            if (!steps) {
                data.value = props.value;
                return;
            }

            data.value += diff;
            steps -=1;
            await delay(20);
            doIt();
        };

        doIt();
    };

    const updateTotal = async () => {
        let steps = 14;
        const letters = ((data.total || 0).toString().split('.')[1] || '').length;
        const diff = +((props.total - data.total) / steps).toFixed(letters);

        const doIt = async () => {
            if (!steps) {
                data.total = props.total;
                return;
            }

            data.total += diff;
            steps -=1;
            await delay(30);
            doIt();
        };

        doIt();
    };

    watch(
        () => props.value,
        () => {
            updateValue();
        }
    );

    watch(
        () => props.total,
        () => {
            updateTotal();
        }
    );

    onMounted(() => {
        data.value = 0;
        data.total = 0;

        updateValue();
        updateTotal();
    });

return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (props.value !== null)
    ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
        _cache[1] || (_cache[1] = createStaticVNode("<svg width=\"2479\" height=\"1080\" viewBox=\"0 0 2479 1080\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"bg\" data-v-46cfe4f1><path d=\"M1093.83 975.09L1015.43 1247.58\" stroke-width=\"25\" stroke-miterlimit=\"10\" data-v-46cfe4f1></path><path d=\"M1498.1 988L1591.42 1120.27\" stroke-width=\"25\" stroke-miterlimit=\"10\" data-v-46cfe4f1></path><path d=\"M1470.9 89.9301L1772.72 -152.65\" stroke-width=\"25\" stroke-miterlimit=\"10\" data-v-46cfe4f1></path><path d=\"M1258.34 89.9301L1248.96 -152.65\" stroke-width=\"25\" stroke-miterlimit=\"10\" data-v-46cfe4f1></path><path d=\"M937.03 38.3201L660.97 -186.19\" stroke-width=\"25\" stroke-miterlimit=\"10\" data-v-46cfe4f1></path><path d=\"M1772.72 975.09L2047.07 1125.82\" stroke-width=\"25\" stroke-miterlimit=\"10\" data-v-46cfe4f1></path><path d=\"M1853.53 102.84L2031.59 28\" stroke-width=\"25\" stroke-miterlimit=\"10\" data-v-46cfe4f1></path><path d=\"M799 975.09L745.2 1039.61\" stroke-width=\"25\" stroke-miterlimit=\"10\" data-v-46cfe4f1></path><path d=\"M474.3 543.78L230.94 561.12\" stroke-width=\"25\" stroke-miterlimit=\"10\" data-v-46cfe4f1></path><path d=\"M520.03 89.9301L308.02 -64.8999\" stroke-width=\"25\" stroke-miterlimit=\"10\" data-v-46cfe4f1></path><path d=\"M2047.07 430.51L2823.54 236.03\" stroke-width=\"25\" stroke-miterlimit=\"10\" data-v-46cfe4f1></path><path d=\"M-161 1111.34L261.34 806.71\" stroke-width=\"25\" stroke-miterlimit=\"10\" data-v-46cfe4f1></path><path d=\"M-137.34 65.4199L414.03 406.06\" stroke-width=\"25\" stroke-miterlimit=\"10\" data-v-46cfe4f1></path><path d=\"M2008.14 655.35L2146.67 709.78\" stroke-width=\"25\" stroke-miterlimit=\"10\" data-v-46cfe4f1></path></svg>", 1)),
        (props.title)
          ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "title",
              innerHTML: props.title
            }, null, 8 /* PROPS */, _hoisted_2$1))
          : createCommentVNode("v-if", true),
        createBaseVNode("span", _hoisted_3$1, [
          createCommentVNode(" Value "),
          (openBlock(true), createElementBlock(Fragment, null, renderList(valueItems.value, (item, id) => {
            return (openBlock(), createElementBlock(Fragment, { key: id }, [
              (!!item)
                ? (openBlock(), createBlock(_component_Icon, {
                    key: 0,
                    icon: `l-${item}`
                  }, null, 8 /* PROPS */, ["icon"]))
                : (openBlock(), createElementBlock("span", _hoisted_4$1))
            ], 64 /* STABLE_FRAGMENT */))
          }), 128 /* KEYED_FRAGMENT */))
        ]),
        (props.total)
          ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              _cache[0] || (_cache[0] = createBaseVNode("span", { class: "description" }, [
                createBaseVNode("b", {
                  class: "g-c",
                  innerHTML: 'of'
                })
              ], -1 /* HOISTED */)),
              createBaseVNode("span", _hoisted_5$1, [
                createCommentVNode(" Total "),
                (openBlock(true), createElementBlock(Fragment, null, renderList(totalItems.value, (item, id) => {
                  return (openBlock(), createElementBlock(Fragment, { key: id }, [
                    (!!item)
                      ? (openBlock(), createBlock(_component_Icon, {
                          key: 0,
                          icon: `l-${item}`
                        }, null, 8 /* PROPS */, ["icon"]))
                      : (openBlock(), createElementBlock("span", _hoisted_6$1))
                  ], 64 /* STABLE_FRAGMENT */))
                }), 128 /* KEYED_FRAGMENT */))
              ])
            ], 64 /* STABLE_FRAGMENT */))
          : createCommentVNode("v-if", true)
      ]))
    : createCommentVNode("v-if", true)
}
}

};
const BigCounter = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-46cfe4f1"],['__file',"/home/runner/work/referral-front/referral-front/src/components/forms/BigCounter.vue"]]);

const Home_vue_vue_type_style_index_0_scoped_933e9cdf_lang = '';

const _hoisted_1 = {
  key: 0,
  class: "page-container"
};
const _hoisted_2 = ["src"];
const _hoisted_3 = { class: "button-box" };
const _hoisted_4 = { class: "stats" };
const _hoisted_5 = { key: 0 };
const _hoisted_6 = ["innerHTML"];
const _hoisted_7 = ["innerHTML"];
const _hoisted_8 = { class: "warning" };
const _hoisted_9 = ["innerHTML"];
const _hoisted_10 = ["innerHTML"];
const _hoisted_11 = { class: "warning" };
const _hoisted_12 = ["innerHTML"];
const _hoisted_13 = ["innerHTML"];
const _hoisted_14 = ["innerHTML"];
const _hoisted_15 = ["innerHTML"];
const _hoisted_16 = { class: "button-box" };

    
const _sfc_main = {
  __name: 'Home',
  setup(__props) {

    const { t } = useI18n();
    const { user, leaderboard, ready } = mapState();
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
        (!unref(user).profile.wallet_public_key_ecdsa)
          ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createVNode(Avatar, {
                name: unref(user).profile.first_name,
                class: "big"
              }, null, 8 /* PROPS */, ["name"]),
              createBaseVNode("h1", null, toDisplayString(unref(user).profile.username), 1 /* TEXT */),
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
              (unref(ready) && unref(leaderboard).totalVaultCount)
                ? (openBlock(), createBlock(BigCounter, {
                    key: 0,
                    title: unref(t)('pages.home.stats.rank'),
                    value: unref(user).vasProfile.rank,
                    total: unref(leaderboard).totalVaultCount,
                    class: "position"
                  }, null, 8 /* PROPS */, ["title", "value", "total"]))
                : createCommentVNode("v-if", true),
              createBaseVNode("ul", _hoisted_4, [
                (unref(user).vasProfile?.join_airdrop)
                  ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                      (!unref(leaderboard).totalVaultCount)
                        ? (openBlock(), createElementBlock("li", _hoisted_5, [
                            createVNode(_component_Icon, { icon: "rank" }),
                            createBaseVNode("div", null, [
                              createBaseVNode("span", {
                                innerHTML: unref(t)('pages.home.stats.rank')
                              }, null, 8 /* PROPS */, _hoisted_6),
                              createBaseVNode("span", null, "Your position " + toDisplayString(unref(user).vasProfile.rank) + " of " + toDisplayString(unref(leaderboard).totalVaultCount), 1 /* TEXT */)
                            ])
                          ]))
                        : createCommentVNode("v-if", true),
                      createBaseVNode("li", null, [
                        createVNode(_component_Icon, { icon: "coin" }),
                        createBaseVNode("div", null, [
                          createBaseVNode("span", {
                            innerHTML: unref(t)('pages.home.stats.farmed.title')
                          }, null, 8 /* PROPS */, _hoisted_7),
                          createBaseVNode("span", null, toDisplayString(unref(user).vasProfile.total_points) + " " + toDisplayString(unref(t)('pages.home.stats.farmed.points')), 1 /* TEXT */)
                        ]),
                        createBaseVNode("div", _hoisted_8, [
                          createBaseVNode("span", {
                            innerHTML: unref(t)('pages.home.stats.farmed.description')
                          }, null, 8 /* PROPS */, _hoisted_9),
                          createVNode(_component_Icon, { icon: "triangle-warning" })
                        ])
                      ]),
                      createBaseVNode("li", null, [
                        createVNode(_component_Icon, { icon: "dollar" }),
                        createBaseVNode("div", null, [
                          createBaseVNode("span", {
                            innerHTML: unref(t)('pages.home.stats.balance.title')
                          }, null, 8 /* PROPS */, _hoisted_10),
                          createBaseVNode("span", null, toDisplayString(unref(numberWithSpaces)(unref(user).vasProfile.balance)) + " $", 1 /* TEXT */)
                        ]),
                        createBaseVNode("div", _hoisted_11, [
                          createBaseVNode("span", {
                            innerHTML: unref(t)('pages.home.stats.balance.description')
                          }, null, 8 /* PROPS */, _hoisted_12),
                          createVNode(_component_Icon, { icon: "triangle-warning" })
                        ])
                      ])
                    ], 64 /* STABLE_FRAGMENT */))
                  : createCommentVNode("v-if", true),
                createBaseVNode("li", null, [
                  createVNode(_component_Icon, { icon: "referrals-secondary" }),
                  createBaseVNode("div", null, [
                    createBaseVNode("span", {
                      innerHTML: unref(t)('pages.home.stats.refferals')
                    }, null, 8 /* PROPS */, _hoisted_13),
                    createBaseVNode("span", null, toDisplayString(unref(user).profile.referrals_count), 1 /* TEXT */)
                  ])
                ]),
                (unref(user).vasProfile?.uid)
                  ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                      createBaseVNode("li", null, [
                        createVNode(_component_Icon, { icon: "verified" }),
                        createBaseVNode("div", null, [
                          createBaseVNode("span", {
                            innerHTML: unref(t)('pages.home.stats.joined.title')
                          }, null, 8 /* PROPS */, _hoisted_14),
                          createBaseVNode("span", null, toDisplayString(unref(user).vasProfile.join_airdrop ? unref(t)('pages.home.stats.joined.yes') : unref(t)('pages.home.stats.joined.no')), 1 /* TEXT */)
                        ])
                      ]),
                      createBaseVNode("li", null, [
                        createVNode(_component_Icon, { icon: "wallet" }),
                        createBaseVNode("div", null, [
                          createBaseVNode("span", {
                            innerHTML: unref(t)('pages.home.stats.name')
                          }, null, 8 /* PROPS */, _hoisted_15),
                          createBaseVNode("span", null, toDisplayString(unref(user).vasProfile.name), 1 /* TEXT */)
                        ])
                      ])
                    ], 64 /* STABLE_FRAGMENT */))
                  : createCommentVNode("v-if", true)
              ]),
              createBaseVNode("div", _hoisted_16, [
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
