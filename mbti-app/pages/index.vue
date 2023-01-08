<template>
  <main v-if="page === 0">
    <img
      src="https://img.freepik.com/free-vector/climbing-concept-illustration_114360-5447.jpg?w=2000"
      alt="Sports Climbing"
    />
    <h1>지브리 캐릭터 MBTI</h1>
    <h1>나와 맞는 캐릭터 찾기</h1>
    <h2>나의 클라이밍 스타일과 어울리는 캐릭터는?</h2>
    <Button text="테스트 시작!" :clickEvent="startTest" />
  </main>
  <main v-else-if="page < 17">
    <Question />
  </main>
</template>

<script>
export default {
  computed: {
    page() {
      return this.$store.state.page;
    },
  },
  methods: {
    startTest() {
      this.$store.commit("SET_PAGE", 1);
    },
  },
};
</script>
