<template>
  <div>
    <h1 style="font-size: 1.5em">{{ page }}. {{ question }}</h1>
    <Button
      v-for="(item, index) in answers"
      styleType="blue"
      :key="index"
      :text="item.text"
      :clickEvent="
        () => {
          clickButton(item);
        }
      "
    />
    <Progress />
  </div>
</template>
<script>
export default {
  computed: {
    page() {
      return this.$store.state.page;
    },
    question() {
      return this.$store.state.questions[this.$store.state.page - 1].q;
    },
    answers() {
      return this.$store.state.questions[this.$store.state.page - 1].a;
    },
  },
  methods: {
    clickButton(item) {
      this.$store.dispatch("clickButton", item.value);
      if (this.page === this.$store.state.questions.length + 1) {
        const result = this.$store.state.result;
        this.$router.push({
          name: "result-mbti",
          params: {
            mbti: `${result.e > result.i ? "e" : "i"}${
              result.s > result.n ? "s" : "n"
            }${result.f > result.t ? "f" : "t"}${
              result.j > result.p ? "j" : "p"
            }`,
          },
        });
      }
    },
  },
};
</script>
<style></style>
