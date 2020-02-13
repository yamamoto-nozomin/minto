<template>
  <form action>
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ voteTitle }}</p>
        <div>
          <p>開票まであと{{ openDate }}日　 {{ openTime }}</p>
        </div>
      </header>
      <section class="modal-card-body">
        <b-field label="候補">
          <b-radio v-model="radio" native-value="success" type="is-success">アンパンマン</b-radio>
        </b-field>
        <b-field label="投票タイトル" label-position="on-border">
          <b-input v-model="name"></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary">投票する</button>
      </footer>
    </div>
  </form>
</template>

<script>
const ModalForm = {
  props: ["voteTitle", "openDate", "openTime", "option"]
};

export default {
  components: {
    ModalForm
  },
  data() {
    return {
      formProps: {
        voteTitle: "evan@you.com",
        openDate: "testing"
      }
    };
  }
};
</script>
