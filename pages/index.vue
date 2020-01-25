<template>
  <div class="container">
    <div>
      <div>
        <!--<logo/>-->
        <h1 class="title">minto みんなの投票</h1>
        <b-navbar>
          <template slot="end">
            <b-navbar-item href="#">Home</b-navbar-item>
            <b-navbar-item href="#">Documentation</b-navbar-item>
            <b-navbar-dropdown label="Info">
              <b-navbar-item href="#">About</b-navbar-item>
              <b-navbar-item href="#">Contact</b-navbar-item>
            </b-navbar-dropdown>
          </template>
        </b-navbar>
      </div>
      <div>
        <h2 class="subtitle">好きな投票を作って、みんなで決めよう！</h2>
        <p>『minto（ミント）』は、無料で使えるツールです。
          <br>あなたの好きな投票を作りましょう。
        </p>
      </div>
      <div>
        <h3>投票を作る！</h3>
        <b-field label="投票タイトル">
          <b-input v-model="name"></b-input>
        </b-field>
        <b-field label="説明文">
          <b-input maxlength="200" type="textarea"></b-input>
        </b-field>
      </div>
      <div>
        <div class="left-box">
          <b-switch v-model="isRtl">票の重み</b-switch>
          <b-switch v-model="score" :disabled="text">無記名</b-switch>
          <b-switch v-model="text" :disabled="score">一般公開する</b-switch>
          <b-input v-model="custom" placeholder="候補" :disabled="text"></b-input>
          <b-input v-model="custom" placeholder="候補" :disabled="text"></b-input>
          <b-input v-model="custom" placeholder="候補" :disabled="text"></b-input>
          <b-input v-model="custom" placeholder="候補" :disabled="text"></b-input>
          <b-input v-model="custom" placeholder="候補" :disabled="text"></b-input>
        </div>
        <div class="right-box"></div>
      </div>
      <div>
        <div class="links">
          <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation
            <icon-link/>
          </a>
          <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import IconLink from "~/components/IconLink.vue";

export default {
  components: {
    Logo,
    IconLink
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 100;
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
