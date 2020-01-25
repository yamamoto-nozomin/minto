<template>
  <div class="container">
    <div>
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
          <br>あなたの好きな投票を作りましょう。
        </p>
      </div>
      <div>
        <h3>投票を作る！</h3>
        <b-field label="投票タイトル" label-position="on-border">
          <b-input v-model="name"></b-input>
        </b-field>
        <b-field label="説明文" label-position="on-border">
          <b-input maxlength="200" type="textarea"></b-input>
        </b-field>
      </div>
      <div>
        <div class="left-box">
          <b-field label="候補">
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
          <b-field label="投票数">
            <p>一人</p>
            <b-numberinput controls-position="compact" min="1" max="10"></b-numberinput>
            <p>票までOK！</p>
          </b-field>
          <b-field label="公開日時">
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
      <div>
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
      <div>
        <b-field grouped group-multiline>
          <b-field label="人気の投票">
            <b-table
              :data="isEmpty ? [] : rankingData"
              :paginated="isPaginated"
              :per-page="perPage"
              :current-page.sync="currentPage"
              :pagination-simple="isPaginationSimple"
              :pagination-position="paginationPosition"
              :default-sort-direction="defaultSortDirection"
              :sort-icon="sortIcon"
              :sort-icon-size="sortIconSize"
              :bordered="isBordered"
              :striped="isStriped"
              :narrowed="isNarrowed"
              :hoverable="isHoverable"
              :loading="isLoading"
              :focusable="isFocusable"
              :mobile-cards="hasMobileCards"
              default-sort="id"
              aria-next-label="Next page"
              aria-previous-label="Previous page"
              aria-page-label="Page"
              aria-current-label="Current page"
            >
              <template slot-scope="props">
                <b-table-column field="id" label="勢い" width="40" sortable numeric>{{ props.row.id }}</b-table-column>
                <b-table-column
                  field="user.first_name"
                  label="タイトル"
                  sortable
                >{{ props.row.user.first_name }}</b-table-column>
                <b-table-column field="date" label="作成日" sortable centered>
                  <span class="tag is-success">{{ new Date(props.row.date).toLocaleDateString() }}</span>
                </b-table-column>
                <b-table-column field="date" label="公開日" sortable centered>
                  <span class="tag is-success">{{ new Date(props.row.date).toLocaleDateString() }}</span>
                </b-table-column>
              </template>
              <template slot="empty">
                <section class="section">
                  <div class="content has-text-grey has-text-centered">
                    <p>
                      <b-icon icon="emoticon-sad" size="is-large"></b-icon>
                    </p>
                    <p>まだ情報がありません・・・</p>
                  </div>
                </section>
              </template>
            </b-table>
          </b-field>
          <b-field label="最近作成された投票">
            <b-table
              :data="isEmpty ? [] : latelyData"
              :paginated="isPaginated"
              :per-page="perPage"
              :current-page.sync="currentPage"
              :pagination-simple="isPaginationSimple"
              :pagination-position="paginationPosition"
              :default-sort-direction="defaultSortDirection"
              :sort-icon="sortIcon"
              :sort-icon-size="sortIconSize"
              :bordered="isBordered"
              :striped="isStriped"
              :narrowed="isNarrowed"
              :hoverable="isHoverable"
              :loading="isLoading"
              :focusable="isFocusable"
              :mobile-cards="hasMobileCards"
              default-sort="id"
              aria-next-label="Next page"
              aria-previous-label="Previous page"
              aria-page-label="Page"
              aria-current-label="Current page"
            >
              <template slot-scope="props">
                <b-table-column field="id" label="勢い" width="40" sortable numeric>{{ props.row.id }}</b-table-column>
                <b-table-column
                  field="user.first_name"
                  label="タイトル"
                  sortable
                >{{ props.row.user.first_name }}</b-table-column>
                <b-table-column field="date" label="作成日" sortable centered>
                  <span class="tag is-success">{{ new Date(props.row.date).toLocaleDateString() }}</span>
                </b-table-column>
                <b-table-column field="date" label="公開日" sortable centered>
                  <span class="tag is-success">{{ new Date(props.row.date).toLocaleDateString() }}</span>
                </b-table-column>
              </template>
              <template slot="empty">
                <section class="section">
                  <div class="content has-text-grey has-text-centered">
                    <p>
                      <b-icon icon="emoticon-sad" size="is-large"></b-icon>
                    </p>
                    <p>まだ情報がありません・・・</p>
                  </div>
                </section>
              </template>
            </b-table>
          </b-field>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import IconLink from "~/components/IconLink.vue";
import ShareButtons from "~/components/ShareButtons";

import rankingData from "~/data/sample.json";

export default {
  components: {
    Logo,
    IconLink,
    ShareButtons
  },
  methods: {
    toast() {
      this.$buefy.toast.open("クリップボードにコピーしました");
    }
  },
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
      rankingData,
      isEmpty: false,
      isBordered: false,
      isStriped: true,
      isNarrowed: true,
      isHoverable: true,
      isFocusable: true,
      isLoading: false,
      hasMobileCards: false,
      isPaginated: true,
      isPaginationSimple: true,
      paginationPosition: "bottom",
      defaultSortDirection: "asc",
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      currentPage: 1,
      perPage: 10
    };
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
