<template>
  <div class="company-karma-wrapper">
    <company-ability
      :data-source="getCurrentCompanyFormItem"
      @change="abilityChange"
    ></company-ability>
    <karma-table-default></karma-table-default>
  </div>
</template>
<script>
import CompanyAbility from './CompanyAbility'
import KarmaTableDefault from './KarmaTableDefault'
// const typeToRareness = ['ANNIV', 'N', 'NH', 'R', 'SR', 'SSR', 'SP']
// {"name":"李澤言·迷津","type":5,"category":1,"gain":"累計充值獎勵","card_id":318,"evolved":1,"star":7,"level":60,"decisiveness":698,"creativity":3433,"kindness":19256,"activity":6213,"total":29600}
// function covertFromUntitled(oldKarmaList) {
//   const newKarmaList = oldKarmaList.map((karma) => ({
//     character: karma.name.split('·')[0],
//     name: karma.name.split('·')[1],
//     rareness: typeToRareness[karma.type],
//     decision: karma.decisiveness,
//     creativity: karma.creativity,
//     affinity: karma.kindness,
//     execution: karma.activity,
//   }))
// }
export default {
  name: 'CompanyKarma',
  components: {
    CompanyAbility,
    KarmaTableDefault,
  },
  props: {
    currentCompany: {
      type: Object,
      default() {
        return null
      },
    },
  },
  computed: {
    getCurrentCompanyFormItem() {
      const newValue = this.currentCompany
      console.log('refresh currentCompany', newValue)
      const newValueList =
        newValue == null
          ? [0, 0, 0, 0]
          : [
              newValue.ability.decision,
              newValue.ability.creativity,
              newValue.ability.affinity,
              newValue.ability.execution,
            ]
      const tempFomeItem = this.companyFormItem.map((item, index) => ({
        ...item,
        defaultValue: newValueList[index],
      }))
      return tempFomeItem
    },
  },
  data() {
    return {
      companyFormItem: [
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
        },
        {
          labelText: '親和',
          type: 'number',
          fieldName: 'affinity',
          placeholder: '',
          defaultValue: 0,
        },
        {
          labelText: '行動',
          type: 'number',
          fieldName: 'execution',
          placeholder: '',
          defaultValue: 0,
        },
      ],
    }
  },
  methods: {
    abilityChange(newValue) {
      if (newValue) {
        // emit event to save company value
        this.$emit('company-ability-change', newValue)
      } else {
        // reset
      }
      console.log('ability change: ', newValue)
    },
  },
}
</script>
