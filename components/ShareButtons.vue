<template>
  <b-field grouped group-multiline>
    <aside>
      <ul class="social-list">
        <li class="social-list-item">
          <a
            class="social-list-link icon-twitter"
            :href="twitterUrl()"
            target="_blank"
            title="Twitterで共有"
          >
            <i class="mdi mdi-twitter"/>
          </a>
        </li>
        <li class="social-list-item">
          <a
            class="social-list-link icon-line"
            :href="lineUrl()"
            target="_blank"
            title="LINEでシェアする"
          >
            <b>LINE</b>
          </a>
        </li>
        <li class="social-list-item">
          <a
            class="social-list-link icon-hatebu"
            :href="hatebuUrl()"
            target="_blank"
            :data-hatena-bookmark-title="encodeURIComponent(url)"
            title="このエントリーをはてなブックマークに追加"
          >
            <b>B!</b>
          </a>
        </li>
        <li class="social-list-item">
          <a
            class="social-list-link icon-pocket"
            :href="pocketUrl()"
            target="_blank"
            title="pocketで共有"
          >
            <i class="mdi mdi-pocket"/>
          </a>
        </li>
      </ul>
    </aside>
  </b-field>
</template>

<script>
export default {
  name: "ShareButtons",
  props: ["title"],
  data() {
    return {
      url: `https://${this.$route.path}`,
      twitter_url: "https://twitter.com/intent/tweet?url={0}&text={1}",
      line_url: "https://social-plugins.line.me/lineit/share?url={0}&text={1}",
      hatebu_url:
        "http://b.hatena.ne.jp/add?mode=confirm&amp;url={0}&amp;title={1}",
      pocket_url: "http://getpocket.com/edit?url={0}"
    };
  },
  methods: {
    formatByArr(msg) {
      // フォーマット（引数可変（配列）版）
      var args = [];
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
      // URLエンコード
      args = args.map(x => encodeURIComponent(x));
      return msg.replace(/\{(\d+)\}/g, function(m, k) {
        return args[k];
      });
    },
    // それぞれパラメータを埋め込む
    twitterUrl() {
      return this.formatByArr(this.twitter_url, this.url, this.title);
    },
    lineUrl() {
      return this.formatByArr(this.line_url, this.url, this.title);
    },
    hatebuUrl() {
      return this.formatByArr(this.hatebu_url, this.url, this.title);
    },
    pocketUrl() {
      return this.formatByArr(this.pocket_url, this.url);
    }
  }
};
</script>

<style scoped>
.social-list {
  list-style: none;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin: auto;
}

.social-list-item {
  height: 0px;
  line-height: 0px;
}
.social-list-item {
  flex-grow: 1;
  height: 36px;
  line-height: 36px;
  min-width: 50px;
  text-align: center;
}
.social-list-link.icon-twitter {
  background: #00b0ed;
}
.social-list-link.icon-hatebu {
  background: #008fde;
}
.social-list-link.icon-pocket {
  background: #eb4654;
}
.social-list-link.icon-line {
  background: #00c300;
}
.social-list-link {
  display: block;
  color: #ffffff;
  margin-left: 5px;
}
a {
  color: inherit;
  text-decoration: none;
}
.content li + li {
  margin-top: 0;
}
</style>