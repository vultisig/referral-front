import { _ as _export_sfc, u as useI18n, r as reactive, b as openBlock, d as createElementBlock, g as createBaseVNode, p as createVNode, l as unref } from './index.b3a07228.js';
import { E as EmptyLabel } from './EmptyLabel.8348668e.js';

const AccessDenied_vue_vue_type_style_index_0_scoped_277b3fba_lang = '';

const _hoisted_1 = { class: "page-container" };

    
const _sfc_main = {
  __name: 'AccessDenied',
  setup(__props) {

    const { t, tm, rt } = useI18n();

    const description = tm('pages.access-denied.descriptions').map(item => rt(item));

    const data = reactive({
        description: description[Math.min(parseInt(Math.random() * description.length), description.length - 1)] 
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    _cache[0] || (_cache[0] = createBaseVNode("label", { class: "g-c hashtag" }, "#VultisigBot ", -1 /* HOISTED */)),
    createVNode(EmptyLabel, {
      title: unref(t)('pages.access-denied.title'),
      description: data.description
    }, null, 8 /* PROPS */, ["title", "description"])
  ]))
}
}

};
const AccessDenied = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-277b3fba"],['__file',"/home/runner/work/referral-front/referral-front/src/pages/AccessDenied.vue"]]);

export { AccessDenied as default };
