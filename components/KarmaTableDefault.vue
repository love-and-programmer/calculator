<template>
  <div class="karma-table-wrapper">
    <a-card :bordered="false">
      <template v-slot:title>
        <span style="text-align:left;margin:0;">
          {{ title }}
        </span>
      </template>
      <template v-slot:extra>
        <a-row type="flex" justify="start" align="middle">
          <slot>
            <a-input-search
              allow-clear
              :size="SearchGlobalOptions.size"
              :style="{ width: '170px' }"
              placeholder="搜尋羈絆名稱"
              @change="searchKeyChangeHandler"
            />
          </slot>
        </a-row>
      </template>
    </a-card>
    <a-table
      row-key="id"
      :columns="columns"
      :data-source="getFilteredData"
      :size="SearchGlobalOptions.size"
      bordered
      @change="handleFilter"
    >
      <template
        v-for="col in ['decision', 'creativity', 'affinity', 'execution']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <a-input-number
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="(value) => handleChange(value, record.id, col)"
          />
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.id)">儲存</a>
            <a-divider type="vertical" />
            <a-popconfirm title="確定取消？" @confirm="() => cancel(record.id)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.id)">修改</a>
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
import filter from 'lodash/filter'
import concat from 'lodash/concat'
import KarmaLogic from './KarmaLogic'
export default {
  props: {
    title: {
      type: String,
      default: '羈絆列表',
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
    dataSource: {
      type: Object,
      default() {
        return null
      },
    },
  },
  data() {
    this.cacheData = KarmaLogic.allKarma.map((item) => ({ ...item }))
    return {
      firstDrive: true,
      data: KarmaLogic.allKarma,
      sortedInfo: null,
      filteredInfo: null,
      searchFilterKey: '',
      isSaving: false,
      // isEditModalVisible: false,
      // editModalTitle: '',
      // currentKarma: null,
    }
  },
  computed: {
    columns() {
      let { sortedInfo, filteredInfo } = this
      sortedInfo = sortedInfo || {}
      filteredInfo = filteredInfo || {}
      const columnList = [
        {
          title: '羈絆名稱',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '角色',
          dataIndex: 'character',
          key: 'character',
          filters: [
            { text: '李澤言', value: '李澤言' },
            { text: '許墨', value: '許墨' },
            { text: '周棋洛', value: '周棋洛' },
            { text: '白起', value: '白起' },
          ],
          filteredValue: filteredInfo.character || null,
          onFilter: (value, record) => record.character.includes(value),
        },
        {
          title: '稀有度',
          dataIndex: 'rareness',
          key: 'rareness',
          filters: [
            { text: 'SP', value: 'SP' },
            { text: 'SSR', value: 'SSR' },
            { text: 'SR', value: 'SR' },
            { text: 'R', value: 'R' },
          ],
          filteredValue: filteredInfo.rareness || null,
          onFilter: (value, record) => record.rareness === value,
        },
        {
          title: '決策',
          dataIndex: 'decision',
          key: 'decision',
          sorter: (a, b) => a.decision - b.decision,
          sortOrder: sortedInfo.columnKey === 'decision' && sortedInfo.order,
          scopedSlots: { customRender: 'decision' },
        },
        {
          title: '創造',
          dataIndex: 'creativity',
          key: 'creativity',
          sorter: (a, b) => a.creativity - b.creativity,
          sortOrder: sortedInfo.columnKey === 'creativity' && sortedInfo.order,
          scopedSlots: { customRender: 'creativity' },
        },
        {
          title: '親和',
          dataIndex: 'affinity',
          key: 'affinity',
          sorter: (a, b) => a.affinity - b.affinity,
          sortOrder: sortedInfo.columnKey === 'affinity' && sortedInfo.order,
          scopedSlots: { customRender: 'affinity' },
        },
        {
          title: '行動',
          dataIndex: 'execution',
          key: 'execution',
          sorter: (a, b) => a.execution - b.execution,
          sortOrder: sortedInfo.columnKey === 'execution' && sortedInfo.order,
          scopedSlots: { customRender: 'execution' },
        },
        {
          title: '操作(添加或修改)',
          dataIndex: 'operation',
          key: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
      ]
      return columnList
    },
    SearchGlobalOptions() {
      // 全局配置
      return {
        size: this.size,
        responsive: this.responsive,
      }
    },
    getFilteredData() {
      // dataSource -> karmaList -> this.data / this.cacheData
      let karmaList = null
      if (this.dataSource === null) {
        karmaList = KarmaLogic.allKarma
      } else {
        karmaList = this.dataSource.map((item) => ({ ...item }))
        // collect exist karma id
        const filterOutIdList = this.dataSource.reduce((pre, item) => {
          pre.push(item.id)
          return pre
        }, [])
        // prepare rest of the karma
        const restList = filter(KarmaLogic.allKarma, function(o) {
          return !(o.id in filterOutIdList)
        })
        // append to karmaList
        karmaList = concat(karmaList, restList)
      }
      // filter with search key
      if (this.searchFilterKey) {
        return karmaList.filter((item) =>
          item.name.includes(this.searchFilterKey)
        )
      } else {
        return karmaList
      }
      // TODO: try to avoid trigger data change
      // eslint-disable-next-line
      this.cacheData = karmaList.map((item) => ({ ...item }))
      // eslint-disable-next-line
      this.data = karmaList.map((item) => ({ ...item }))
    },
  },
  methods: {
    searchKeyChangeHandler(e) {
      const key = e.currentTarget.value
      console.log('search key change', key)
      if (key) {
        this.searchFilterKey = key.trim()
      } else {
        this.searchFilterKey = ''
      }
    },
    // table filter handler
    handleFilter(pagination, filters, sorter) {
      console.log('Various parameters', pagination, filters, sorter)
      this.filteredInfo = filters
      this.sortedInfo = sorter
    },
    // triggered every time when input-number value change
    // affect to "this.data" only
    handleChange(value, key, column) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.id)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    edit(key) {
      // this.editModalTitle = item.name
      // this.isEditModalVisible = true
      // switch on edit mode
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.id)[0]
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    save(key) {
      // this.isSaving = true
      // this.currentKarma
      // trigger event to "source-data-item-change"
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.id)[0]
      if (target) {
        delete target.editable
        this.data = newData
        this.cacheData = newData.map((item) => ({ ...item }))
        // trigger parent to save to local storage
        this.$emit('source-data-item-change', target)
      }
    },
    cancel(key) {
      // this.isEditModalVisible = false
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.id)[0]
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item.id)[0]
        )
        delete target.editable
        this.data = newData
      }
    },
  },
}
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
