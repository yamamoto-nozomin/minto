<template>
  <form action>
    <div class="modal-card" style="width: auto">
      <!--<header class="modal-card-head">
        <p class="modal-card-title">Edit</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Name">
          <b-input v-model="nameText" placeholder="タスクを入力してください" required></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button">削除</button>
        <button class="button is-primary">完了</button>
      </footer>-->
      <header class="modal-card-head">
        <p class="modal-card-title">{{nameText}}</p>
        <div>
          <p>開票まであと openDate 日 openTime</p>
        </div>
      </header>
      <section class="modal-card-body">
        <b-field label="候補">
          <label v-for="option in options" :key="option.options">
            <!--<b-radio-button
              v-model="radio"
              native-value="success"
              name="voteOpt"
              type="is-success"
            >{{option}}</b-radio-button>-->
            <input type="radio" name="voteOpt" v-model="radio" :value="option">
            {{option}}
          </label>
        </b-field>
        <b-field label="お名前" label-position="on-border">
          <b-input v-model="signText" placeholder="記名してください" required></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary">投票する</button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    name: "",
    options: ""
  },
  data() {
    return {
      nameText: this.name,
      option: this.options
    };
  }
};
</script>
