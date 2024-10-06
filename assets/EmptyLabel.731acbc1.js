import { _ as _export_sfc, o as openBlock, d as createElementBlock, h as createCommentVNode } from './index.b633f6b4.js';

const EmptyLabel_vue_vue_type_style_index_0_scoped_fc14ccf6_lang = '';

const _hoisted_1 = ["innerHTML"];
const _hoisted_2 = ["innerHTML"];


const _sfc_main = {
  __name: 'EmptyLabel',
  props: {
    title: { type: String, default: '' },
    description: { type: String, default: '' }
},
  setup(__props) {

const props = __props;

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", null, [
    (props.title)
      ? (openBlock(), createElementBlock("span", {
          key: 0,
          innerHTML: props.title
        }, null, 8 /* PROPS */, _hoisted_1))
      : createCommentVNode("v-if", true),
    (props.description)
      ? (openBlock(), createElementBlock("span", {
          key: 1,
          class: "description",
          innerHTML: props.description
        }, null, 8 /* PROPS */, _hoisted_2))
      : createCommentVNode("v-if", true)
  ]))
}
}

};
const EmptyLabel = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-fc14ccf6"],['__file',"/home/runner/work/referral-front/referral-front/src/components/forms/EmptyLabel.vue"]]);

export { EmptyLabel as E };
