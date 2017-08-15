import Component, { tracked } from '@glimmer/component';
import { DEFAULT_DATA, DEFAULT_TEMPLATE, DEFAULT_LAYOUT } from './defaults';

const APPEND_NAMES = ['push-child-scope','pop-scope','push-dynamic-scope','pop-dynamic-scope','put','evaluate-put','put-args','bind-positional-args','bind-named-args','bind-blocks','bind-partial-args','bind-caller-scope','bind-dynamic-scope','enter','exit','evaluate','jump','jump-if','jump-unless','test','open-block','close-block','put-dynamic-component','put-component','open-component','did-create-element','shadow-attributes','did-render-layout','close-component','text','comment','dynamic-content','open-element','push-remote-element','pop-remote-element','open-component-element','open-dynamic-element','flush-element','close-element','pop-element','static-attr','modifier','dynamic-attr-ns','dynamic-attr','put-iterator','enter-list','exit-list','enter-with-key','next-iter','put-dynamic-partial','put-partial','evaluate-partial'];

let $inputs:   Element,
    $data:     HTMLTextAreaElement,
    $template: HTMLTextAreaElement,
    $layout:   HTMLTextAreaElement,
    $render:   Element,
    $update:   Element,
    $edit:     Element,
    $reset:    Element;

export default class GlimmerVisualizer extends Component {
  @tracked rendered = false;

  html = '';
  data = DEFAULT_DATA;
  updatingOpcodes = null;
  template = {
    source: DEFAULT_TEMPLATE,
    wireFormat: null,
    opcodes: null,
  };
  layout = {
    source: DEFAULT_LAYOUT,
    wireFormat: null,
    opcodes: null,
  };

  didInsertElement() {
    this.bindUI();
    this.wireUI();
  }

  bindUI() {
    $inputs   = document.querySelectorAll('#inputs')[0];
    $data     = <HTMLTextAreaElement>document.querySelectorAll('#data')[0];
    $template = <HTMLTextAreaElement>document.querySelectorAll('#top-level-template')[0];
    $layout   = <HTMLTextAreaElement>document.querySelectorAll('#component-layout')[0];
    $render   = document.querySelectorAll('#btn-render')[0];
    $update   = document.querySelectorAll('#btn-update')[0];
    $edit     = document.querySelectorAll('#btn-edit')[0];
    $reset    = document.querySelectorAll('#btn-reset')[0];
  }

  wireUI() {
    $render.addEventListener('click', this.renderContent, false);
    $update.addEventListener('click', this.updateContent, false);
    $edit.addEventListener('click', this.editContent, false);
    $reset.addEventListener('click', this.resetContent, false);

    $data.addEventListener('input', this.storeContent);
    $template.addEventListener('input', this.storeContent);
    $layout.addEventListener('input', this.storeContent);

    this.initContent();
  }

  renderContent = () => {}

  updateContent = () => {}

  editContent = () => {
    // _updateContent = null;
    this.rendered = false;
  }

  resetContent = () => {
    $data.value = DEFAULT_DATA;
    $template.value = DEFAULT_TEMPLATE;
    $layout.value = DEFAULT_LAYOUT;

    this.storeContent();
    this.editContent();
  }

  storeContent = () => {
    localStorage.setItem('glimmer-visualizer:content', JSON.stringify({
      data: $data.value,
      template: $template.value,
      layout: $layout.value,
    }));
  }

  initContent() {
    let { data, template, layout } = this.getInitialContent();

    $data.value = data;
    $template.value = template;
    $layout.value = layout;
  }

  getInitialContent() {
    return this.getStoredContent() || {
      data: DEFAULT_DATA,
      template: DEFAULT_TEMPLATE,
      layout: DEFAULT_LAYOUT,
    };
  }

  getStoredContent() {
    let content = localStorage.getItem('glimmer-visualizer:content');
    if (content) {
      return JSON.parse(content);
    }
  }
}
