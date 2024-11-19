import { _ as _export_sfc, u as useI18n, m as mapState, k as mapMutations, q as mapActions, r as reactive, w as watch, o as onMounted, a as resolveComponent, b as openBlock, i as createBlock, l as unref, d as createElementBlock, g as createBaseVNode, p as createVNode, f as createCommentVNode, s as createTextVNode, t as toDisplayString, F as Fragment, h as renderList, B as Button, j as delay, L as Loader } from './index.b3a07228.js';
import { A as Avatar } from './Avatar.85a85724.js';
import { E as EmptyLabel } from './EmptyLabel.8348668e.js';

const Referrals_vue_vue_type_style_index_0_scoped_c8e84f31_lang = '';

const _hoisted_1 = { class: "page-container" };
const _hoisted_2 = ["innerHTML"];
const _hoisted_3 = {
  key: 1,
  class: "users-list"
};
const _hoisted_4 = ["innerHTML"];
const _hoisted_5 = ["innerHTML"];
const _hoisted_6 = {
  key: 1,
  class: "state"
};
const _hoisted_7 = ["innerHTML"];
const _hoisted_8 = ["innerHTML"];
const _hoisted_9 = ["innerHTML"];
const _hoisted_10 = { class: "invite-box" };

    
const _sfc_main = {
  __name: 'Referrals',
  setup(__props) {

    const { t } = useI18n();
    const { user, settings, ready } = mapState();
    const { openModal } = mapMutations();
    const { getReferrals, me, checkAirdropStatus } = mapActions();

    const data = reactive({
        referrals: [],
        total: 0,
        loading: true
    });

    const invite = () => {
        openModal('invite');
    };

    const getAirdropInfo = async (item) => {
        if (!item.wallet_public_key_ecdsa) {
            return;
        }

        item.loading = true;
        item.join_airdrop = !!await checkAirdropStatus(item.uuid);
        item.loading = false;

        const idx = data.referrals.indexOf(item);
        if (idx !== -1) {
            data.referrals.splice(idx, 1, {...item});
        }
    };

    const getReferralsList = async () => {
        data.loading = true;
        await delay(400);

        const payload = await getReferrals({
            skip: data.referrals.length,
            take: +settings.value.REFERRALS_DEFAULT_TAKE || 30
        });

        if (payload?.total) {
            data.total = payload.total;
        }

        if (payload?.items) {
            payload?.items.forEach(item => {
                item.join_airdrop = false;
                getAirdropInfo(item);
            });
            data.referrals = [...data.referrals, ...payload.items];
        }

        data.loading = false;
    };

    watch(
        () => ready.value,
        async () => {
            if (ready.value) {
                await me();
                getReferralsList();
            }
        }
    );

    onMounted(async () => {
        if (ready.value) {
            await me();
            getReferralsList();
        }
    });

return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (data.loading && !data.referrals.length)
    ? (openBlock(), createBlock(Loader, {
        key: 0,
        class: "light"
      }))
    : (unref(user).profile?.id)
      ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createBaseVNode("div", _hoisted_1, [
            createVNode(_component_Icon, {
              icon: "referrals",
              alt: unref(t)('pages.referrals.title')
            }, null, 8 /* PROPS */, ["alt"]),
            createBaseVNode("h1", {
              innerHTML: unref(t)('pages.referrals.title')
            }, null, 8 /* PROPS */, _hoisted_2),
            createCommentVNode(" <span v-html=\"t('pages.referrals.description')\" class=\"description\"></span> "),
            (!data.referrals.length)
              ? (openBlock(), createBlock(EmptyLabel, {
                  key: 0,
                  title: unref(t)('pages.referrals.empty.title'),
                  description: unref(t)('pages.referrals.empty.description'),
                  class: "empty"
                }, null, 8 /* PROPS */, ["title", "description"]))
              : (openBlock(), createElementBlock("div", _hoisted_3, [
                  createBaseVNode("span", null, [
                    createTextVNode(toDisplayString(unref(user).profile?.referrals_count) + " ", 1 /* TEXT */),
                    createBaseVNode("span", {
                      innerHTML: unref(t)('pages.referrals.total')
                    }, null, 8 /* PROPS */, _hoisted_4),
                    _cache[0] || (_cache[0] = createBaseVNode("br", null, null, -1 /* HOISTED */)),
                    createBaseVNode("span", {
                      innerHTML: unref(t)('pages.referrals.description')
                    }, null, 8 /* PROPS */, _hoisted_5)
                  ]),
                  createBaseVNode("ul", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(data.referrals, (item) => {
                      return (openBlock(), createElementBlock("li", {
                        key: item.username
                      }, [
                        createVNode(Avatar, {
                          name: item.username || item.first_name || unref(t)('common.unnamed')
                        }, null, 8 /* PROPS */, ["name"]),
                        createBaseVNode("div", null, [
                          createBaseVNode("div", null, [
                            createBaseVNode("span", null, toDisplayString(item.username || item.first_name || unref(t)('common.unnamed')), 1 /* TEXT */)
                          ]),
                          (item.loading)
                            ? (openBlock(), createBlock(Button, {
                                key: 0,
                                class: "light loader",
                                loading: true
                              }))
                            : (openBlock(), createElementBlock("span", _hoisted_6, [
                                (!item.wallet_public_key_ecdsa)
                                  ? (openBlock(), createElementBlock("span", {
                                      key: 0,
                                      innerHTML: unref(t)('pages.referrals.steps.registered')
                                    }, null, 8 /* PROPS */, _hoisted_7))
                                  : (!item.join_airdrop)
                                    ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                        createBaseVNode("span", {
                                          innerHTML: unref(t)('pages.referrals.steps.added')
                                        }, null, 8 /* PROPS */, _hoisted_8),
                                        createVNode(_component_Icon, { icon: "wallet" })
                                      ], 64 /* STABLE_FRAGMENT */))
                                    : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                                        createBaseVNode("span", {
                                          innerHTML: unref(t)('pages.referrals.steps.joined')
                                        }, null, 8 /* PROPS */, _hoisted_9),
                                        createVNode(_component_Icon, { icon: "verified" })
                                      ], 64 /* STABLE_FRAGMENT */))
                              ]))
                        ])
                      ]))
                    }), 128 /* KEYED_FRAGMENT */))
                  ]),
                  (data.total > data.referrals.length && !data.loading)
                    ? (openBlock(), createBlock(Button, {
                        key: 0,
                        name: unref(t)('common.more'),
                        class: "light secondary",
                        onClick: getReferralsList
                      }, null, 8 /* PROPS */, ["name"]))
                    : createCommentVNode("v-if", true),
                  (data.loading)
                    ? (openBlock(), createBlock(Button, {
                        key: 1,
                        class: "light loader",
                        loading: true
                      }))
                    : createCommentVNode("v-if", true)
                ]))
          ]),
          createBaseVNode("div", _hoisted_10, [
            createVNode(Button, {
              name: unref(t)('pages.referrals.invite'),
              onClick: invite
            }, null, 8 /* PROPS */, ["name"])
          ])
        ], 64 /* STABLE_FRAGMENT */))
      : createCommentVNode("v-if", true)
}
}

};
const Referrals = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-c8e84f31"],['__file',"/home/runner/work/referral-front/referral-front/src/pages/Referrals.vue"]]);

export { Referrals as default };