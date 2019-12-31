<template>
  <a-layout id="components-layout-demo-fixed">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo" />
      <!-- <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">nav 1</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
      </a-menu> -->
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
        <a-tabs defaultActiveKey="1" @change="callback">
          <a-tab-pane key="1">
            <span slot="tab">
              <a-icon type="cluster" />
              公司基本資訊
            </span>
            <company-karma></company-karma
          ></a-tab-pane>
          <a-tab-pane key="2" forceRender>
            <span slot="tab">
              <a-icon type="video-camera" />
              票房
            </span>
            Content of Tab Pane 2</a-tab-pane
          >
          <a-tab-pane key="3">
            <span slot="tab">
              <a-icon type="crown" />
              試煉
            </span>
            敬請期待</a-tab-pane
          >
        </a-tabs>
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Love and Programmar @2019 同人計算機 數值權重為官方所有 目前以台服進度為主
    </a-layout-footer>
  </a-layout>
</template>
<script>
import ls from 'local-storage'
import CompanyKarma from '~/components/CompanyKarma.vue'
export default {
  components: {
    CompanyKarma,
  },
  data() {
    return {
      currentCompany: null,
      currentKarmaList: null,
    }
  },
  asyncData(context) {
    return {
      currentCompany: ls('currentCompany'),
      currentKarmaList: ls('currentKarmaList'),
    }
  },
  mounted() {
    console.log('company', this.currentCompany)
    console.log('karma list', this.currentKarmaList)
  },
  methods: {
    callback(key) {
      console.log(key)
    },
  },
}
</script>
<style>
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
