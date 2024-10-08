import { _ as _export_sfc, u as useI18n, m as mapState, a as mapMutations, i as mapActions, r as reactive, w as watch, j as onMounted, k as resolveComponent, o as openBlock, g as createBlock, b as unref, d as createElementBlock, f as createBaseVNode, e as createVNode, t as toDisplayString, F as Fragment, l as renderList, B as Button, h as createCommentVNode, n as delay, L as Loader } from './index.a7c9e1cd.js';
import { A as Avatar } from './Avatar.03961769.js';
import { E as EmptyLabel } from './EmptyLabel.9b81bb85.js';

const Referrals_vue_vue_type_style_index_0_scoped_c8e84f31_lang = '';

const _hoisted_1 = { class: "page-container" };
const _hoisted_2 = ["innerHTML"];
const _hoisted_3 = {
  key: 1,
  class: "users-list"
};
const _hoisted_4 = { class: "invite-box" };

    
const _sfc_main = {
  __name: 'Referrals',
  setup(__props) {

    const { t } = useI18n();
    const { user, settings, ready } = mapState();
    const { openModal } = mapMutations();
    const { getReferrals, me } = mapActions();

    const data = reactive({
        referrals: [],
        total: 0,
        loading: true
    });

    const invite = () => {
        openModal('invite');
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
              icon: "frens",
              alt: unref(t)('pages.referrals.title')
            }, null, 8 /* PROPS */, ["alt"]),
            createBaseVNode("h1", {
              innerHTML: unref(t)('pages.referrals.title')
            }, null, 8 /* PROPS */, _hoisted_2),
            (!data.referrals.length)
              ? (openBlock(), createBlock(EmptyLabel, {
                  key: 0,
                  title: unref(t)('pages.referrals.empty.title'),
                  description: unref(t)('pages.referrals.empty.description'),
                  class: "emty"
                }, null, 8 /* PROPS */, ["title", "description"]))
              : (openBlock(), createElementBlock("div", _hoisted_3, [
                  createBaseVNode("span", null, toDisplayString(data.total) + " " + toDisplayString(unref(t)('common.referrals')), 1 /* TEXT */),
                  createBaseVNode("ul", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(data.referrals, (item) => {
                      return (openBlock(), createElementBlock("li", {
                        key: item.username
                      }, [
                        createVNode(Avatar, {
                          name: item.username || item.first_name
                        }, null, 8 /* PROPS */, ["name"]),
                        createBaseVNode("div", null, [
                          createBaseVNode("div", null, [
                            createBaseVNode("span", null, toDisplayString(item.username || item.first_name), 1 /* TEXT */)
                          ]),
                          (item.wallet_public_key_ecdsa)
                            ? (openBlock(), createBlock(_component_Icon, {
                                key: 0,
                                icon: "verified"
                              }))
                            : createCommentVNode("v-if", true)
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
          createBaseVNode("div", _hoisted_4, [
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
