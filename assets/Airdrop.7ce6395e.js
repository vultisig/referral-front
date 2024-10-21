import { _ as _export_sfc, h as mapActions, u as useI18n, m as mapState, i as reactive, r as resolveComponent, b as unref, o as openBlock, d as createElementBlock, e as createVNode, f as createBaseVNode, F as Fragment, p as renderList, g as createCommentVNode, B as Button, k as createBlock, s as normalizeClass } from './index.a35d46c6.js';

const Airdrop_vue_vue_type_style_index_0_scoped_94566200_lang = '';

const _hoisted_1 = {
  key: 0,
  class: "page-container"
};
const _hoisted_2 = ["innerHTML"];
const _hoisted_3 = {
  key: 0,
  class: "spoilers"
};
const _hoisted_4 = ["onClick"];
const _hoisted_5 = ["innerHTML"];
const _hoisted_6 = ["innerHTML"];
const _hoisted_7 = {
  key: 1,
  class: "button-box"
};

    
const _sfc_main = {
  __name: 'Airdrop',
  setup(__props) {

    const { getVASUser, joinAirdrop } = mapActions();
    const { t, tm, rt } = useI18n();
    const { user } = mapState();

    const qa = tm('pages.airdrop.qa').map(item => ({
        q: rt(item.q),
        a: rt(item.a)
    }));

    const data = reactive({
        loading: false,
        qa: qa || []
    });

    const registerAirdrop = async () => {
        data.loading = true;

        const payload = await joinAirdrop();
        if (payload) {
            await getVASUser();
        }

        data.loading = false;
    };

    const viewLeaderboard = () => {
        const params = [
            `public_key_ecdsa=${user.value.profile?.wallet_public_key_ecdsa}`,
            `public_key_eddsa=${user.value.profile?.wallet_public_key_eddsa}`,
            'join_airdrop=true'
        ].join('&');

        if (window.Telegram?.WebApp) {
            window.Telegram?.WebApp.openLink("https://airdrop.vultisig.com/leaderboard?source=vultisigbot" + `&${params}`);
        } else {
            window.open("https://airdrop.vultisig.com/leaderboard?source=vultisigbot" + `&${params}`, '_blank');
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
        (data.qa?.length)
          ? (openBlock(), createElementBlock("ul", _hoisted_3, [
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
                    }, null, 8 /* PROPS */, _hoisted_5),
                    createVNode(_component_Icon, { icon: "arrow" })
                  ], 8 /* PROPS */, _hoisted_4),
                  createBaseVNode("div", {
                    innerHTML: item.a
                  }, null, 8 /* PROPS */, _hoisted_6)
                ], 2 /* CLASS */))
              }), 128 /* KEYED_FRAGMENT */))
            ]))
          : createCommentVNode("v-if", true),
        (unref(user).vasProfile?.uid)
          ? (openBlock(), createElementBlock("div", _hoisted_7, [
              (unref(user).vasProfile.join_airdrop)
                ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    createVNode(Button, {
                      name: unref(t)('pages.airdrop.leaderboard'),
                      class: "secondary",
                      onClick: viewLeaderboard
                    }, null, 8 /* PROPS */, ["name"]),
                    createCommentVNode(" <Button\n                    :name=\"t('pages.airdrop.view')\"\n                    class=\"secondary\"\n                    @click=\"viewAirdrop\"\n                /> ")
                  ], 64 /* STABLE_FRAGMENT */))
                : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    (!data.loading)
                      ? (openBlock(), createBlock(Button, {
                          key: 0,
                          name: unref(t)('pages.airdrop.register'),
                          class: "secondary",
                          onClick: registerAirdrop
                        }, null, 8 /* PROPS */, ["name"]))
                      : (openBlock(), createBlock(Button, {
                          key: 1,
                          class: "secondary loader",
                          loading: true
                        }))
                  ], 64 /* STABLE_FRAGMENT */))
            ]))
          : createCommentVNode("v-if", true)
      ]))
    : createCommentVNode("v-if", true)
}
}

};
const Airdrop = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-94566200"],['__file',"/home/runner/work/referral-front/referral-front/src/pages/Airdrop.vue"]]);

export { Airdrop as default };
