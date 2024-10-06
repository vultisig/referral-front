import { _ as _export_sfc, u as useI18n, r as reactive, k as resolveComponent, o as openBlock, d as createElementBlock, e as createVNode, b as unref } from './index.00095929.js';
import { E as EmptyLabel } from './EmptyLabel.16a703ca.js';

const Error_vue_vue_type_style_index_0_scoped_32e38e1e_lang = '';

const _hoisted_1 = { class: "page-container" };

    
const _sfc_main = {
  __name: 'Error',
  setup(__props) {

    const { t, tm, rt } = useI18n();

    const description = tm('pages.error.descriptions').map(item => rt(item));

    const data = reactive({
        description: description[Math.min(parseInt(Math.random() * description.length), description.length - 1)] 
    });

return (_ctx, _cache) => {
  const _component_Icon = resolveComponent("Icon");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_Icon, { icon: "e-500" }),
    createVNode(EmptyLabel, {
      title: unref(t)('pages.error.title'),
      description: data.description
    }, null, 8 /* PROPS */, ["title", "description"])
  ]))
}
}

};
const Error = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-32e38e1e"],['__file',"/home/runner/work/referral-front/referral-front/src/pages/Error.vue"]]);

export { Error as default };
