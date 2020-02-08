<template>
  <div class="introduction">
    <div>
      <!--<logo/>-->
      <h1 class="title">minto みんなの投票</h1>
      <b-navbar>
        <template slot="end">
          <b-navbar-item href="#">使い方</b-navbar-item>
          <b-navbar-item href="#">利用規約</b-navbar-item>
          <b-navbar-dropdown label="問い合わせ">
            <b-navbar-item href="#">About</b-navbar-item>
            <b-navbar-item href="#">Contact</b-navbar-item>
          </b-navbar-dropdown>
        </template>
      </b-navbar>
    </div>
    <div>
      <h2 class="subtitle">好きな投票を作って、みんなで決めよう！</h2>
      <p>『minto（ミント）』は、無料で使えるツールです。
        <br>みんなで好きに投票しましょう。
      </p>
    </div>
  </div>
</template>

<style>
.title {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 200;
  font-size: 42px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 100;
  font-size: 28px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>