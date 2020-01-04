<template>
  <div class="karma-table-wrapper">
    <a-table
      row-key="id"
      :columns="columns"
      :data-source="data"
      bordered
      @change="handleFilter"
    >
      <template
        v-for="col in ['decision', 'creativity', 'affinity', 'execution']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="(e) => handleChange(e.target.value, record.id, col)"
          />
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.id)">Save</a>
            <a-popconfirm
              title="Sure to cancel?"
              @confirm="() => cancel(record.id)"
            >
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.id)">Edit</a>
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
import KarmaLogic from './KarmaLogic'
const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  })
}
export default {
  data() {
    this.cacheData = data.map((item) => ({ ...item }))
    return {
      data: KarmaLogic.allKarma,
      sortedInfo: null,
      filteredInfo: null,
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
  },
  methods: {
    handleFilter(pagination, filters, sorter) {
      console.log('Various parameters', pagination, filters, sorter)
      this.filteredInfo = filters
      this.sortedInfo = sorter
    },
    handleChange(value, key, column) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    edit(key) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    save(key) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        delete target.editable
        this.data = newData
        this.cacheData = newData.map((item) => ({ ...item }))
      }
    },
    cancel(key) {
      const newData = [...this.data]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item.key)[0]
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
