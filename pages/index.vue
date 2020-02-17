<template>
  <div class="container">
    <div>
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
    <div class="vote-create">
      <div>
        <h3 class="contentstitle">投票を作ろう！</h3>
        <b-field label="投票タイトル" label-position="on-border">
          <b-input v-model="name" maxlength="100"></b-input>
        </b-field>
        <b-field label="説明文" label-position="on-border">
          <b-input maxlength="2000" type="textarea"></b-input>
        </b-field>
      </div>
      <div>
        <div class="left-box">
          <b-field label="候補" class="contentssubtitle">
            <b-taginput ellipsis icon="label" type="is-success" rounded placeholder="候補を追加してください"></b-taginput>
          </b-field>
        </div>
        <div class="right-box">
          <b-field label="投票数" class="contentssubtitle"></b-field>
          <b-field class="linemiddle">
            <p>一人</p>
            <b-numberinput controls-position="compact" min="1" max="10"></b-numberinput>
            <p>票までOK！</p>
          </b-field>
          <b-field label="公開日時" class="contentssubtitle">
            <b-datetimepicker
              v-model="openDateTime"
              placeholder="公開する日時を選んでください"
              icon="calendar-today"
              size="is-small"
              :min-datetime="minDatetime"
              :max-datetime="maxDatetime"
            >
              <template slot="left">
                <button class="button is-primary" @click="openDateTime = new Date()">
                  <b-icon icon="clock"></b-icon>
                  <span>Now</span>
                </button>
              </template>
              <template slot="right">
                <button class="button is-danger" @click="openDateTime = null">
                  <b-icon icon="close"></b-icon>
                  <span>Clear</span>
                </button>
              </template>
            </b-datetimepicker>
          </b-field>
          <b-field label="作成者メールアドレス" label-position="on-border" type="is-danger">
            <b-input type="email" maxlength="100"></b-input>
          </b-field>
          <b-field>
            <b-switch v-model="isSwitchedRate" type="is-success">
              <strong>票の重み付け</strong>
            </b-switch>
            <b-switch
              v-model="isSwitchedSignature"
              type="is-info"
              true-value="記名制にする"
              false-value="無記名"
            >{{ isSwitchedSignature }}</b-switch>
            <b-switch
              v-model="isSwitchedOpen"
              type="is-warning"
              true-value="一般公開する"
              false-value="一般公開しない"
            >{{ isSwitchedOpen }}</b-switch>
          </b-field>
          <p>mintoでは単純な多数決にならないようにする為、票に重みをつけることができます。</p>
          <b-field v-if="isSwitchedRate" grouped group-multiline>
            <b-field label="重み付け1つ目">
              <p>1票で</p>
              <b-numberinput
                v-model="customRate"
                controls-position="compact"
                min="1"
                max="10"
                :disabled="!isSwitchedRate"
              ></b-numberinput>
              <p>票分！</p>
            </b-field>
            <b-field label="重み付け2つ目">
              <p>1票で</p>
              <b-numberinput
                v-model="customRate"
                controls-position="compact"
                min="1"
                max="10"
                :disabled="!isSwitchedRate"
              ></b-numberinput>
              <p>票分！</p>
            </b-field>
          </b-field>
          <b-button size="is-large" type="is-success" icon-left="leaf">投票を作成！</b-button>

          <b-button class="button is-primary" v-on:click="voteFor(name)">投票画面(イメージ図)</b-button>
          <b-modal :active.sync="isModalActive">
            <vote-modal v-bind="formProps"></vote-modal>
          </b-modal>
        </div>
      </div>
    </div>
    <div class="vote-links">
      <b-field label="投票用リンク" label-position="on-border" grouped group-multiline>
        <b-input type="text" readonly></b-input>
        <p class="control">
          <b-button type="is-info" @click="toast">コピー</b-button>
        </p>
        <share-buttons :title="title"/>
      </b-field>
      <b-field
        label="重み付け1リンク"
        label-position="on-border"
        v-if="isSwitchedRate"
        grouped
        group-multiline
      >
        <b-input type="text" readonly></b-input>
        <p class="control">
          <b-button type="is-info" @click="toast">コピー</b-button>
        </p>
        <share-buttons :title="title"/>
      </b-field>
      <b-field
        label="重み付け2リンク"
        label-position="on-border"
        v-if="isSwitchedRate"
        grouped
        group-multiline
      >
        <b-input type="text" readonly></b-input>
        <p class="control">
          <b-button type="is-info" @click="toast">コピー</b-button>
        </p>
        <share-buttons :title="title"/>
      </b-field>
    </div>

    <div class="vote-ranking"></div>
  </div>
</template>

<script>
import IconLink from "~/components/IconLink.vue";
import ShareButtons from "~/components/ShareButtons";
import VoteModal from "@/components/VoteModal";

export default {
  data() {
    const min = new Date();
    const max = new Date();
    max.setDate(max.getDate() + 365);
    return {
      isSwitchedSignature: "無記名",
      isSwitchedRate: false,
      isSwitchedOpen: "一般公開しない",
      minDatetime: min,
      maxDatetime: max,
      openDateTime: new Date(),
      name: "",
      isModalActive: false,
      formProps: {
        name: ""
      }
    };
  },
  components: {
    IconLink,
    ShareButtons,
    "vote-modal": VoteModal
  },

  methods: {
    toast() {
      this.$buefy.toast.open("クリップボードにコピーしました");
    },
    voteFor(name) {
      this.formProps.name = name;
      this.isModalActive = true;
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: box;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.contentstitle {
  font-weight: bold;
  font-size: 20px;
  word-spacing: 2px;
  padding-bottom: 5px;
  text-align: left;
}

.contentssubtitle {
  font-size: 18px;
  text-align: left;
}

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

.links {
  padding-top: 15px;
}
</style>
