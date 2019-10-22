<template>
  <div class="container">
    <div>
      <el-container style="overflow: scroll;">
        <el-header style="overflow: scroll; width: 100vw">
          <div style="width: 30em; overflow-x:auto; overflow-y:none;">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
            >
              <el-menu-item index="1">公司及羈絆總覽</el-menu-item>
              <el-menu-item index="2">心靈試煉 </el-menu-item>
              <el-menu-item index="3">票房爭奪戰</el-menu-item>
              <el-menu-item index="4">關於</el-menu-item>
            </el-menu>
          </div>
        </el-header>
        <el-main style="overflow: scroll; width: 100vw">
          <div>
            test
          </div>
          <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="公司及羈絆總覽" name="company"
              >公司及羈絆總覽</el-tab-pane
            >
            <el-tab-pane label="心靈試煉" name="heart-trail"
              >心靈試煉</el-tab-pane
            >
            <el-tab-pane label="票房爭奪戰" name="box-office"
              >票房爭奪戰</el-tab-pane
            >
            <el-tab-pane label="關於" name="about">關於</el-tab-pane>
          </el-tabs> -->
        </el-main>
        <el-footer></el-footer>
      </el-container>

      <!-- <logo />
      <h1 class="title">
        caculator
      </h1>
      <h2 class="subtitle">
        This is a calculator project for the game -- Love and Producer
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div> -->
    </div>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'

export default {
  // components: {
  //   Logo,
  // },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  /* text-align: center; */
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
