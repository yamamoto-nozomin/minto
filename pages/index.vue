<template>
  <div class="container">
    <div class="vote-create">
      <div>
        <h3 class="contentstitle">投票を作ろう！</h3>
        <b-field label="投票タイトル" label-position="on-border">
          <b-input v-model="name"></b-input>
        </b-field>
        <b-field label="説明文" label-position="on-border">
          <b-input maxlength="200" type="textarea"></b-input>
        </b-field>
      </div>
      <div>
        <div class="left-box">
          <b-field label="候補" class="contentssubtitle">
            <b-taginput
              v-model="option"
              ellipsis
              icon="label"
              type="is-success"
              rounded
              placeholder="候補を追加してください"
            ></b-taginput>
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
        </div>
      </div>
    </div>
    <button class="button is-primary is-medium" @click="cardModal()">押して味噌</button>

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
import ModalForm from "~/components/ModalForm";

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
      voteTitle: "みんな大好き何パンマン？"
    };
  },
  components: {
    IconLink,
    ShareButtons,
    ModalForm
  },
  methods: {
    toast() {
      this.$buefy.toast.open("クリップボードにコピーしました");
    },
    cardModal() {
      this.$buefy.modal.open({
        parent: this,
        component: ModalForm,
        hasModalCard: false,
        customClass: "custom-class custom-class-2",
        trapFocus: true
      });
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

.links {
  padding-top: 15px;
}
</style>
