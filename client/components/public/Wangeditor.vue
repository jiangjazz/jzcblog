/** 
* 富文本编辑器
*/
<template>
  <div id="edit" class="u-wangeditor" v-loading="isShowLoading" element-loading-text="Uploading">
    <slot name="comment"></slot>
    <div :id="idName" ref="ccc" style="text-align:left">
    </div>
    <slot name="sendreply"></slot>
    <slot name="edit"></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const menus = [
        'source',
        '|',
        'bold',
        'underline',
        'italic',
        'strikethrough',
        'eraser',
        'forecolor',
        'bgcolor',
        '|',
        'quote',
        'fontfamily',
        'fontsize',
        'head',
        'unorderlist',
        'orderlist',
        'alignleft',
        'aligncenter',
        'alignright',
        '|',
        'link',
        'unlink',
        'table',
        'emotion',
        '|',
        'img',
        'video',
        'location',
        'insertcode',
        '|',
        'undo',
        'redo',
        'fullscreen'
    ]
export default {
  name: 'editor',
  props: {
    // id名 防止一个页面多个编辑器
    idName: {
      type: String,
      default: 'editorElem'
    }
  },
  data() {
    return {
      editor: '',
      editorContent: '',
      isShowLoading: false
    }
  },
  computed: {
    ...mapState(['baseUrl', 'uid'])
  },
  methods: {
    getContent: function() {
      return this.editorContent
    },
    initContent: function(txt) {
      console.log('%c:::::::', 'background:yellow;', this)
      this.editor.$textElem.html(txt)
    }
  },
  mounted() {
    let _this = this
    let Editor = this.$wangEditor
    this.editor = new Editor(`#${this.idName}`)
    this.editor.create()
  }
}
</script>
