<template>
  <div class="advance-search-wrapper">
    <a-form :form="form" @submit="handleSubmit">
      <template v-if="layoutMode === 'inline'">
        <a-card :bordered="bordered">
          <a-row :gutter="gutter">
            <template v-for="(item, index) in renderDataSource">
              <field-render
                :SearchGlobalOptions="SearchGlobalOptions"
                :itemOptions="item"
                :key="item.fieldName"
                v-show="
                  index < SearchGlobalOptions.maxItem ||
                    (index >= SearchGlobalOptions.maxItem && collapsed)
                "
              />
            </template>
            <a-col :style="{ width: collapsed ? '100%' : 'auto' }">
              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>公司能力</span>
                </template>
                <a-button
                  type="primary"
                  :size="SearchGlobalOptions.size"
                  @click="handleSubmit"
                  icon="save"
                >
                  查询
                </a-button>
              </a-tooltip>

              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>重置所有項目</span>
                </template>
                <a-button
                  :size="SearchGlobalOptions.size"
                  style="margin-left: 8px"
                  @click="resetSearchForm"
                  icon="border"
                >
                  重置
                </a-button>
              </a-tooltip>
              <template v-if="showCollapsedText">
                <a @click="togglecollapsed" style="margin-left: 8px">
                  <a-tooltip placement="bottom">
                    <template slot="title">
                      <span>{{ collapsed ? '收起' : '展開' }}</span>
                    </template>
                    {{ collapsed ? '收起' : '展開' }}
                    <a-icon :type="collapsed ? 'up' : 'down'" />
                  </a-tooltip>
                </a>
              </template>
              <slot name="extra" />
            </a-col>
          </a-row>
        </a-card>
      </template>
      <template v-else>
        <a-card :bordered="bordered">
          <template v-slot:title>
            <span style="text-align:left;margin:0;">
              {{ title }}
            </span>
          </template>

          <template v-slot:extra>
            <a-row type="flex" justify="start" align="middle">
              <slot>
                <a-tooltip placement="bottom">
                  <template slot="title">
                    <span>儲存公司能力值到本地瀏覽器</span>
                  </template>
                  <a-button
                    type="primary"
                    :size="SearchGlobalOptions.size"
                    @click="handleSubmit"
                    icon="save"
                  >
                    儲存
                  </a-button>
                </a-tooltip>

                <a-tooltip placement="bottom">
                  <template slot="title">
                    <span>重置所有項目</span>
                  </template>
                  <a-button
                    :size="SearchGlobalOptions.size"
                    style="margin-left: 8px"
                    @click="resetSearchForm"
                    icon="border"
                  >
                    重置
                  </a-button>
                </a-tooltip>
              </slot>
              <template v-if="showCollapsedText">
                <a @click="togglecollapsed" style="margin-left: 8px">
                  <a-tooltip placement="bottom">
                    <template slot="title">
                      <span>{{ collapsed ? '收起' : '展開' }}</span>
                    </template>
                    {{ collapsed ? '收起' : '展開' }}
                    <a-icon :type="collapsed ? 'up' : 'down'" />
                  </a-tooltip>
                </a>
              </template>
              <slot name="extra" />
            </a-row>
          </template>

          <a-row :gutter="gutter">
            <template v-for="(item, index) in renderDataSource">
              <template v-if="item.type && item.fieldName">
                <field-render
                  :SearchGlobalOptions="SearchGlobalOptions"
                  :itemOptions="item"
                  :key="item.fieldName"
                  v-show="
                    index < SearchGlobalOptions.maxItem ||
                      (index >= SearchGlobalOptions.maxItem && collapsed)
                  "
                />
              </template>
            </template>
          </a-row>
        </a-card>
      </template>
    </a-form>
  </div>
</template>

<script>
import FieldRender from './FieldRender'
export default {
  name: 'CompanyAbility',
  components: {
    FieldRender,
  },
  computed: {
    showCollapsedText() {
      // 显示展开搜索和收缩的判定
      return this.renderDataSource.length > this.maxItem
    },
    SearchGlobalOptions() {
      // 全局配置
      return {
        maxItem: this.maxItem,
        size: this.size,
        immediate: this.immediate,
        responsive: this.responsive,
      }
    },
    renderDataSource() {
      // 重组传入的数据，合并全局配置，子项的配置优先全局
      return this.dataSource.map((item) => ({
        ...this.SearchGlobalOptions,
        ...item,
      }))
    },
    layoutMode() {
      // 展示模式优化
      if (this.layout) return this.layout
      if (this.maxItem > this.dataSource.length) {
        return 'inline'
      } else {
        return 'card'
      }
    },
  },
  props: {
    layout: {
      // 搜索区域的布局
      type: String,
      default: '',
    },
    bordered: {
      // 是否显示边框
      type: Boolean,
      default: false,
    },
    datetimeTotimeStamp: {
      // 是否把时间控件的返回值全部转为时间戳
      type: Boolean,
      default: false,
    },
    maxItem: {
      // 超过多少个折叠
      type: Number,
      default: 4,
    },
    gutter: {
      // 控件的间距
      type: Number,
      default: 48,
    },
    size: {
      //  控件的尺寸
      type: String,
      default: 'default',
    },
    responsive: {
      type: Object,
      default() {
        return {
          xxl: 6,
          xl: 8,
          md: 12,
          sm: 24,
        }
      },
    },
    title: {
      type: String,
      default: '公司能力',
    },
    dataSource: {
      // 数据源
      type: Array,
      default() {
        return [
          {
            labelText: '決策',
            type: 'number',
            fieldName: 'decision',
            placeholder: '',
            defaultValue: 0,
            required: true,
          },
          {
            labelText: '創造',
            type: 'number',
            fieldName: 'creativity',
            placeholder: '',
            defaultValue: 0,
            required: true,
          },
          {
            labelText: '親和',
            type: 'number',
            fieldName: 'affinity',
            placeholder: '',
            defaultValue: 0,
            required: true,
          },
          {
            labelText: '行動',
            type: 'number',
            fieldName: 'execution',
            placeholder: '',
            defaultValue: 0,
            required: true,
          },
        ]
      },
    },
  },
  data() {
    return {
      // 高级搜索 展开/关闭
      collapsed: false,
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },

  methods: {
    togglecollapsed() {
      this.collapsed = !this.collapsed
    },
    handleParams(obj) {
      // 判断必须为obj
      if (!(Object.prototype.toString.call(obj) === '[object Object]')) {
        return {}
      }
      // eslint-disable-next-line
      let tempObj = {}
      // eslint-disable-next-line
      for (let [key, value] of Object.entries(obj)) {
        if (Array.isArray(value) && value.length <= 0) continue
        if (Object.prototype.toString.call(value) === '[object Function]')
          continue

        if (this.datetimeTotimeStamp) {
          // 若是为true,则转为时间戳
          if (
            Object.prototype.toString.call(value) === '[object Object]' &&
            value._isAMomentObject
          ) {
            // 判断moment
            value = value.valueOf()
          }
          if (
            Array.isArray(value) &&
            value[0]._isAMomentObject &&
            value[1]._isAMomentObject
          ) {
            // 判断moment
            value = value.map((item) => item.valueOf())
          }
        }
        // 若是为字符串则清除两边空格
        if (value && typeof value === 'string') {
          value = value.trim()
        }
        tempObj[key] = value
      }

      return tempObj
    },
    handleSubmit(e) {
      // 触发表单提交，也就是搜索按钮
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          if (
            this.$listeners.callBackFormat &&
            typeof this.$listeners.callBackFormat === 'function'
          ) {
            const formatData = this.$listeners.callBackFormat(values)
            this.$emit('change', formatData)
          } else {
            const queryParams = this.handleParams(values)
            this.$emit('change', queryParams)
          }
        }
      })
    },
    resetSearchForm() {
      // 重置整个查询表单
      this.form.resetFields()
      this.$emit('change', null)
    },
  },
}
</script>

<style lang="scss">
.advance-search-wrapper {
  .ant-form-item {
    display: flex;
    margin-bottom: 12px !important;
    margin-right: 0;

    .ant-form-item-control-wrapper {
      flex: 1;
      display: inline-block;
      vertical-align: middle;
    }

    > .ant-form-item-label {
      line-height: 32px;
      padding-right: 8px;
      width: auto;
    }
    .ant-form-item-control {
      height: 32px;
      line-height: 32px;
      justify-content: flex-start;
      align-items: center;
      .ant-form-item-children {
        min-width: 160px;
      }
    }
  }

  .table-page-search-submitButtons {
    display: block;
    margin-bottom: 24px;
    white-space: nowrap;
  }
}
</style>
