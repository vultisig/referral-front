import { _ as _export_sfc, u as useI18n, m as mapState, a as mapMutations, c as computed, b as unref, o as openBlock, d as createElementBlock, e as createVNode, f as createBaseVNode, t as toDisplayString, g as createBlock, h as createCommentVNode, B as Button } from './index.d992a1bf.js';
import { A as Avatar } from './Avatar.25d7becd.js';
import { E as EmptyLabel } from './EmptyLabel.13d32967.js';

const Home_vue_vue_type_style_index_0_scoped_933e9cdf_lang = '';

const _hoisted_1 = {
  key: 0,
  class: "page-container"
};
const _hoisted_2 = ["src"];
const _hoisted_3 = {
  key: 1,
  class: "description"
};
const _hoisted_4 = { class: "button-box" };

    
const _sfc_main = {
  __name: 'Home',
  setup(__props) {

    const { t } = useI18n();
    const { user } = mapState();
    const { openModal } = mapMutations();

    const emptyImg = computed(() => {
        const path = `${({}).VITE_APP_BASE_URL}/img/problems.svg`;
        return new URL(path, import.meta.url).href;
    });

    const openWallet = () => {
        openModal('wallet');
    };


return (_ctx, _cache) => {
  return (unref(user).profile.id)
    ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(Avatar, {
          name: unref(user).profile.first_name,
          class: "big"
        }, null, 8 /* PROPS */, ["name"]),
        createBaseVNode("h1", null, toDisplayString(unref(user).profile.username), 1 /* TEXT */),
        (!unref(user).profile.wallet_public_key_ecdsa)
          ? (openBlock(), createBlock(EmptyLabel, {
              key: 0,
              title: unref(t)('pages.home.wallet.empty.title'),
              description: unref(t)('pages.home.wallet.empty.description')
            }, null, 8 /* PROPS */, ["title", "description"]))
          : createCommentVNode("v-if", true),
        createBaseVNode("img", {
          class: "home-img",
          src: emptyImg.value
        }, null, 8 /* PROPS */, _hoisted_2),
        (unref(user).profile.wallet_public_key_ecdsa)
          ? (openBlock(), createElementBlock("div", _hoisted_3, [
              _cache[0] || (_cache[0] = createBaseVNode("b", { class: "g-c" }, "ECDSA Key:", -1 /* HOISTED */)),
              createBaseVNode("span", null, toDisplayString(unref(user).profile.wallet_public_key_ecdsa), 1 /* TEXT */),
              _cache[1] || (_cache[1] = createBaseVNode("br", null, null, -1 /* HOISTED */)),
              _cache[2] || (_cache[2] = createBaseVNode("b", { class: "g-c" }, "EdDSA Key:", -1 /* HOISTED */)),
              createBaseVNode("span", null, toDisplayString(unref(user).profile.wallet_public_key_eddsa), 1 /* TEXT */)
            ]))
          : createCommentVNode("v-if", true),
        createBaseVNode("div", _hoisted_4, [
          createVNode(Button, {
            name: unref(user).profile.wallet_public_key_ecdsa ? unref(t)('pages.home.wallet.edit') : unref(t)('pages.home.wallet.add'),
            class: "secondary",
            onClick: openWallet
          }, null, 8 /* PROPS */, ["name"])
        ])
      ]))
    : createCommentVNode("v-if", true)
}
}

};
const Home = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-933e9cdf"],['__file',"/home/runner/work/referral-front/referral-front/src/pages/Home.vue"]]);

export { Home as default };
