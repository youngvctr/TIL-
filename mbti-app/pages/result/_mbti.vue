<template lang="en">
  <main>
    <div>
      <b-card bg-variant="default">
        <h3><strong>{{ result[mbti].title }}</strong></h3>
        <h1 style="font-size: 2em;font-family:Georgia;"><strong>{{ result[mbti].character }}</strong></h1>
        <img :src="result[mbti].img" :alt="result[mbti].title" style="width:280px;border:1px solid lightgray;"></img>

        <b-card-text>
          <hr class="one">
        </b-card-text>
        
        <b-card-text>
          <strong><p class="jm-font" v-html="result[mbti].description1"></p></strong>
        </b-card-text>

        <b-card-text>
          <p style="font-family:sans-serif;" v-html="result[mbti].description2"></p>
        </b-card-text>

        <b-card-text>
          <hr class="one">
        </b-card-text>

      <b-row>
        <b-col>
          <p class="perfect"style="color:rgb(3, 3, 3);font-family:sans-serif;text-align:left;margin-bottom:0px;width:140px;font-family:revert;"><strong>🥳Perfect match</strong></p>
        </b-col>
        <b-col>
          <p style="color:rgb(3, 3, 3);text-align:right;margin-bottom:0px;width:140px;font-family:revert;"><strong>Mismatch🥲</strong></p>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <img :src='result[match(mbti, "p")].img' :alt="result[mbti].title" style="width:140px;height:100px;margin-bottom:0px;"/>
        </b-col>
        <b-col>
          <img :src='result[match(mbti, "b")].img' :alt="result[mbti].title" style="width:140px;height:100px;margin-bottom:0px;"/>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <p style="text-align:left;margin-bottom:20px;"><strong>{{ result[match(mbti, "p")].character }}</strong></p>
        </b-col>
        <b-col>
          <p style="text-align:right;margin-bottom:20px;"><strong>{{ result[match(mbti, "b")].character }}</strong></p>
        </b-col>
      </b-row>
  </b-card>
</div>

    <b-container fluid>
      <b-row>
        <!-- <Button :clickEvent="sharePage" text="카카오톡 공유하기" style="margin-bottom:20px;margin-top:20px;"></Button> -->
        <Button :clickEvent="resetPage" text="처음으로" style="margin-bottom:20px;margin-top:30px;width:400px"></Button>
      </b-row>
    </b-container>

  </main>
</template>
<script>
const typeImg = {
  enfj: "http://kid.chosun.com/site/data/img_dir/2019/06/09/2019060900883_0.jpg",
  enfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThMxZnss5Ojl-G8pIjRVPRfl0380JpV24fVwxXDpeN5eaSgW-yibDkvfwzsSzBH1fNOcU&usqp=CAU",
  entj: "https://w.namu.la/s/10c0b136da569f1e1ade57a5bbf7c618df4b2ccc70125faeedc17edb4c0cac15b6b08f502cff2c31a3020a1693aa9933c45952dd466deb0a23460cf644b7a968e7c094ca58eeacc1b763a759d8adfd4cb20636ed12c143d358ef4936f5e7b9e904e6a7874f29a7191143958b83d37c6b",
  entp: "https://w.namu.la/s/0e93433b330f748016c57ac012527999714ec3357dd03e980804298c5f7446eece65dae3c0bf9a7585b4ca7712694089891575cfba27a9aaf2d5ab7ef860e4ab5aba216b28559b2df141a308eefbdaf499da2ebae2eb22dd70f04c902774059227a2e7e776b797e911817627cad10934",
  esfj: "https://w.namu.la/s/ccf524bb3e8d940b94a1f6b6445b33e0f0fb5f29725768f2eee0e6c3e8f8797d6d11c8a049f855389fae6cee5a45b3ae3081cfa73cdd801d76b61ec227434d9708702b7d59fa242d998415b3a19c1cf57432203c37ba9404f6167ab172a8e02c95353b40db3e75d3a8d66c6059ea7e18",
  esfp: "https://img.khan.co.kr/news/2008/12/05/2008120500992.jpg",
  estj: "https://pbs.twimg.com/media/DqLgeCEVAAAt613.jpg:small",
  estp: "https://t1.daumcdn.net/cfile/tistory/996FE93359D05FD42B",
  infp: "https://w.namu.la/s/8f8f38ce6a837ec30c6baefbe9f1049d3296c56462a615be22116a2f2001333b5a140e2c8105a8f88ea30eeab4002ce65c9fa4a19421bdca273249987cee1aed652ac7fae76c5dd038067a0ff45f207b65b25684aaec85e49201f9a7d4d686b04a336a27486ed86272cba73294d11678",
  infj: "https://w.namu.la/s/13f4bc2d2b7bedc7ae5593b3ff57a5b9a6cfb53f550ca5f7f4f1b7e0091ef684cb467bb43844cc5eb80dffcbd628fff303115405b03d0be306ded452d9f1bc68ff36610c6319e2721065c3f0e0279cae678f5ccea08ca907418ba871a610e88245270ae6e5b46de002abe9e2b10e0ac8",
  intp: "https://w.namu.la/s/d72ceb15e61f4a337358408425644627df2b6304c1bb61c7d47f0fabf13bcd178ee0860d50a137e642a9b15c84b31e2159f12052cb34d1d4f240db474903af04cdd62be88e92b74f26ac07a32f34036e0c8688aff4d357e4a8902f6a49b786ddfcb69566344bb0695bf0376f04414af9",
  intj: "https://w.namu.la/s/01c54ad40868af1a2d056510e024ab0b4bb02cd8a7e02d2bbfccc5386da671e9e45164c5152f1caf4c01d83873802391286c2e1ef528a6ec3e6a4cf5f438cfb7678dbb30331bb508e31bc259ad17b3126a0e345c19dc2eaa3429689e78f3a57d40b53d762d01cad033d19625abdc8097",
  isfj: "https://i.pinimg.com/736x/57/08/5b/57085bacb5f370456c1116a2484caa26.jpg",
  isfp: "http://image.news1.kr/system/pics/attachments/2203/article.png?1418385355",
  istp: "https://t1.daumcdn.net/cfile/tistory/245AD33B522AD86E14",
  istj: "https://w.namu.la/s/17dfc21c40de0b6dc8533739bfd1bf096e7e714ee7ebd4cc63a7130b1278519764c6eb1a467e4ca92f0377d488f295205d5b3ef3a692ff09583a53c46dfd7331b7a9685d7453ade6c37c65d4d8eda67f54a9482a8b0212fc19b86b52b3d52c3f4897ed5ef9db388e1bafa27f11680279",
};
export default {
  data() {
    return {
      mbti: null,
      result: {
        esfj: {
          img: typeImg.esfj,
          perfect: typeImg.istp,
          mismatch: typeImg.enfj,
          title: "이웃집 토토로",
          character: "메이",
          description1: "긍정 에너지 완충🔋⚡️",
          description2:
            "이타적인 성격으로 남과 함께 나눌 때 가장 즐거워합니다. 친절하고 따뜻한 태도를 유지하며, 주변 사람들에 대한 강한 책임감을 느끼곤 합니다. 믿음직스러운 성격으로 가족과 주변 사람을 챙기기 위해 자신을 희생할 때가 많습니다. ",
        },
        enfp: {
          img: typeImg.enfp,
          perfect: typeImg.intj,
          mismatch: typeImg.isfp,
          title: "센과 치히로의 행방불명",
          character: "치히로",
          description1:
            "열정적인 자유로운 영혼🕺🏽💃🏽",
          description2:
            "외향적이고 솔직하며 개방적인 성격입니다. 활기차고 낙관적인 태도로 삶을 대하며 다른 사람들 사이에서 돋보이곤 합니다. 그러나 신나는 삶을 사는 것처럼 보인다고 해서 즐거움만을 좇는 성격은 아니며, 다른 사람과 감정적으로 깊고 의미 있는 관계를 맺는 일을 추구합니다.",
        },
        estj: {
          img: typeImg.estj,
          perfect: typeImg.intp,
          mismatch: typeImg.infp,
          title: "원령공주",
          character: "에보시",
          description1:
            "사물과 사람을 관리하는 데 뛰어난 능력을 지닌 경영자",
          description2:
          "전통과 질서를 중시하는 성격으로, 자신이 생각하는 옳고 그름과 사회적 기준에 따라 가족과 공동체가 화합할 수 있도록 노력합니다. 또한 정직과 헌신과 존엄성을 중시하며, 어려운 길을 기꺼이 앞장서고 다른 사람들에게 명확한 조언과 지도를 제공합니다. 이들은 사람들이 화합하도록 하는 일에서 자부심을 느낍니다.",
        },
        estp: {
          img: typeImg.estp,
          perfect: typeImg.isfj,
          mismatch: typeImg.enfp,
          title: "천공의 성 라퓨타",
          character: "도라",
          description1:
            "위험을 기꺼이 감수하는 성격의 영리한 에너자이저",
          description2:
            "지능이 높고 활기찬 대화를 유지할 수 있는 성격이기는 하지만 현실적인 주제에 대해 이야기하고 직접 행동하는 성격입니다. 계획을 심사숙고하기보다는 먼저 행동하고 시행착오를 겪으며 실수를 바로잡기를 원합니다.",
        },
        enfj: {
          img: typeImg.enfj,
          perfect: typeImg.isfp,
          mismatch: typeImg.istp,
          title: "마녀 배달부 키키",
          character: "키키",
          description1:
            "카리스마 넘치는 지도자",
          description2:
            "사려 깊고 이상주의적 성향을 지닌 성향으로, 다른 사람과 주변 세상에 긍정적인 영향력을 발휘하기 위해 최선을 다합니다. 또한 어려운 상황에서도 올바른 일을 할 기회를 마다하지 않습니다.",
        },
        esfp: {
          img: typeImg.esfp,
          perfect: typeImg.istj,
          mismatch: typeImg.infj,
          title: "벼랑 위의 포뇨",
          character: "포뇨",
          description1:
            "즉흥적이고 넘치는 에너지와 열정이 가득한 끼쟁이", 
          description2:
            "지금 이 순간을 즐기며 남들도 자신과 같은 즐거움을 느낄 수 있기를 바랍니다. 또한 남을 응원하는 데 기꺼이 시간과 에너지를 투자하며, 매우 매력적인 방식으로 다른 사람의 기운을 북돋곤 합니다.",
        },
        entp: {
          img: typeImg.entp,
          perfect: typeImg.intj,
          mismatch: typeImg.istj,
          title: "마녀 배달부 키키",
          character: "지지",
          description1:
            "지적 도전을 즐기는 영리하고 호기심이 많은 사색가",
          description2:
            "두뇌 회전이 빠르고 대담한 성격으로 현재 상황에 이의를 제기하는 데 거리낌이 없습니다. 어떤 의견이나 사람에 반대하는 일을 두려워하지 않으며, 논란이 될 만한 주제에 대해 격렬하게 논쟁하는 일을 즐깁니다.",
        },
        entj: {
          img: typeImg.entj,
          perfect: typeImg.infp,
          mismatch: typeImg.estj,
          title: "이웃집 토토로",
          character: "사츠키",
          description1:
            "항상 문제 해결 방법을 찾아내는 문제 해결가",
          descripntion2:
            "대담하고 상상력이 풍부하며 의지가 강력한 지도자입니다. 카리스마와 자신감을 지니고 있으며 자신의 권한을 이용해 사람들이 공통된 목표를 위해 함께 노력하도록 이끕니다. 또한 이들은 냉철한 이성을 지닌 것으로 유명하며, 자신이 원하는 것을 성취하기 위해 열정과 결단력과 날카로운 지적 능력을 활용합니다.",
        },
        isfj: {
          img: typeImg.isfj,
          perfect: typeImg.esfp,
          mismatch: typeImg.infj,
          title: "하울의 움직이는 성",
          character: "소피",
          description1:
            "헌신적이고 따뜻한 수호자",
          description2:
            "주변 사람을 보호할 준비가 되어있고, 겸손한 자세로 세상을 지탱하는 역할을 합니다. 이들은 근면하고 헌신적인 성격으로 주변 사람들에 대한 깊은 책임감을 느낍니다. 이들은 마감 기한을 철저히 지키고 동료와 친구의 생일과 기념일을 챙기며, 기존 질서를 유지하고 주변 사람을 배려하는 동시에 기꺼이 도움의 손길을 건넵니다. 또한 감사를 요구하기보다는 뒤에서 묵묵히 헌신하는 성격이라고 할 수 있습니다.",
        },
        isfp: {
          img: typeImg.isfp,
          perfect: typeImg.esfj,
          mismatch: typeImg.enfp,
          title: "하울의 움직이는 성",
          character: "하울",
          description1:
            "항상 새로운 경험을 추구하는 유연하고 매력 넘치는 예술가",
          description2:
            "삶 자체가 자신을 표현하기 위한 캔버스로 입는 옷부터 여가 시간을 보내는 방식까지 다양한 측면에서 자신의 독특한 개성을 생생히 드러냅니다. 호기심이 많고 새로운 것을 추구하는 성격으로 다양한 분야에 관심과 열정을 보일 때가 많습니다. 탐험가적 성향과 일상 생활에서 즐거움을 찾을 수 있는 능력을 지니고 있는 매우 흥미로운 성격이라고 할 수 있습니다. 그러나 보통 자신의 놀라운 개성에 자만하는 대신 자신이 하고 싶은 일을 할 뿐이라고 겸손하게 생각하곤 합니다.",
        },
        istj: {
          img: typeImg.istj,
          perfect: typeImg.esfp,
          mismatch: typeImg.enfp,
          title: "반딧불이의 묘",
          character: "세이타",
          description1:
            "사실을 중시하는 믿음직한 현실주의자",
          descripntion2: 
            "진실하게 행동하는 자신의 모습에서 자부심을 느끼며, 자기 생각을 솔직하게 이야기하고 어떤 것에 헌신하기로 한 경우 최선을 다합니다. 화려한 삶이나 다른 사람의 주의를 끄는 일에는 관심이 없으며, 안정된 사회를 위해 자신의 몫보다 많은 기여를 하곤 합니다. 이들은 가족이나 주변 사람들로부터 믿음직한 사람이라는 평판을 받을 때가 많으며, 현실 감각이 뛰어나 스트레스가 극심한 상황에서도 현실적이고 논리적인 태도를 유지하는 사람으로 인정받곤 합니다.",
        },
        istp: {
          img: typeImg.istp,
          perfect: typeImg.estj,
          mismatch: typeImg.enfj,
          title: "원령공주",
          character: "산",
          description:
            "대담하면서도 현실적인 성격의 장인",
          descripntion2:
            "모든 종류의 도구를 자유자재로 다룰줄 알만큼 새로운 일에 거침없는 성격입니다. 이성과 호기심을 통해 세상을 바라보며 눈과 손으로 직접 탐구하는 일을 즐깁니다. 이들은 타고난 손기술을 지니고 있으며, 다양한 프로젝트에서 유용하고 재미있는 물건을 만들어 내고 주변 환경에서 배울 점을 찾습니다. 이러한 성격유형은 보통 기술자나 엔지니어로 일하는 경우가 많으며 물건을 직접 분해하고 조립해 개선하는 일을 즐깁니다.",
        },
        infj: {
          img: typeImg.infj,
          perfect: typeImg.enfp,
          mismatch: typeImg.estp,
          title: "센과 치히로의 행방불명",
          character: "하쿠",
          description1:
            "차분한 신비주의",
          description2:
            "분위기를 풍기는 성격으로, 다른 사람에게 의욕을 불어넣는 이상주의자입니다. 이상주의적이고 원칙주의적인 성격으로, 삶에 순응하는 대신 삶에 맞서 변화를 만들어 내고자 합니다. 이들에게 성공이란 돈이나 지위가 아니라 자아를 실현하고 다른 사람을 도우며 세상에서 선을 실천하는 일입니다. 원대한 목표와 야망을 품고 있다고 해서 몽상가와 같은 성격이라는 뜻은 아닙니다. 원칙과 완벽함을 중시하며 자신이 옳다고 믿는 일을 끝내기 전에는 만족하지 않습니다. 또한 매우 양심적인 성격으로 자신의 확실한 가치관에 따라 인생을 살아가며, 다른 사람이나 사회의 가치를 따르는 대신 자신의 지혜와 직관을 통해 정말로 중요한 가치를 찾기 위해 노력합니다.",
        },
        infp: {
          img: typeImg.infp,
          perfect: typeImg.enfj,
          mismatch: typeImg.isfj,
          title: "원령공주",
          character: "아시타카",
          description1:
            "항상 선을 행할 준비가 되어 있는 부드럽고 친절한 이타주의자",
          description2: 
            "언뜻 보기에 조용하고 자신을 내세우지 않는 것처럼 보이지만, 사실은 에너지와 열정이 넘치는 마음을 지닌 성격입니다. 이들은 창의적이고 상상력이 뛰어나며 몽상을 즐기는 성격으로, 머릿속에서 수많은 이야기를 만들어 내곤 합니다. 또한 음악과 예술과 자연에 대한 감수성이 뛰어나며 다른 사람의 감정을 빠르게 알아차리곤 합니다. 이상주의적이고 공감 능력이 높으며, 깊고 의미 있는 관계를 원하고 다른 사람을 도와야 한다는 사명감을 느끼곤 합니다. 그러나 전체 인구에서 큰 비중을 차지하지 않는 성격이기 때문에 외로움을 느끼거나 존재감을 드러내지 못하는 때가 있으며, 자신의 독특한 강점을 인정하지 않는 세상에서 방황하는 느낌을 받을 수도 있습니다.",
        },
        intp: {
          img: typeImg.intp,
          perfect: typeImg.entj,
          mismatch: typeImg.istj,
          title: "마녀 배달부 키키",
          character: "톰보",
          description1:
            "지식을 갈망하는 혁신적인 발명가",
          description2:
            "자신의 독특한 관점과 활기 넘치는 지성에 자부심을 느끼며, 우주의 미스터리에 대해 깊이 생각하곤 합니다. 상당히 희귀한 성격이지만 뛰어난 창의성과 독창성으로 많은 사람 사이에서 존재감을 드러내곤 합니다. 항상 무엇을 생각하고 있으며 일어난 순간부터 다양한 아이디어와 질문을 떠올립니다. 또한 가끔 머릿속에서 혼자 치열한 토론을 펼치기도 합니다.",
        },
        intj: {
          img: typeImg.intj,
          perfect: typeImg.entp,
          mismatch: typeImg.istj,
          title: "천공의 성 라퓨타",
          character: "시타",
          description1:
            "모든 일에 계획을 세우는 플래너",
          description2:
            "이성적이면서도 두뇌 회전이 빠른 성격으로, 자신의 뛰어난 사고 능력을 자랑스러워하며 거짓말과 위선을 꿰뚫어 보는 능력이 있습니다. 하지만 이로 인해 끊임없이 생각하고 주변의 모든 것을 분석하려는 자신의 성향을 이해할 수 있는 사람을 찾는 데 어려움을 겪기도 합니다. 업무에 자신의 모든 통찰력과 논리력과 의지를 쏟아부으며, 불필요한 규칙을 설정하거나 쓸모없는 비판을 제기하면서 자신을 방해하는 사람에게는 가차 없는 모습을 보입니다.",
        },
      },
    };
  },
  created() {
    this.mbti = this.$route.params.mbti;
    if (this.result[this.$route.params.mbti] === undefined) {
      this.$router.push({ name: "index" });
    }
  },
  methods: {
    resetPage() {
      this.$store.dispatch("clickResetButton");
      this.$router.push({ name: "index" });
    },
    match(type, word) {
      const mbtiType = [
        { mbti: "enfj", perfect: "entj", mismatch: "istp" },
        { mbti: "enfp", perfect: "entj", mismatch: "istp" },
        { mbti: "entj", perfect: "enfj", mismatch: "isfj" },
        { mbti: "entp", perfect: "isfj", mismatch: "infp" },
        { mbti: "esfj", perfect: "esfj", mismatch: "infp" },
        { mbti: "esfp", perfect: "esfp", mismatch: "enfj" },
        { mbti: "estj", perfect: "isfj", mismatch: "infp" },
        { mbti: "estp", perfect: "entj", mismatch: "infj" },
        { mbti: "infp", perfect: "intp", mismatch: "esfp" },
        { mbti: "infj", perfect: "intj", mismatch: "isfp" },
        { mbti: "intp", perfect: "intj", mismatch: "intp" },
        { mbti: "intj", perfect: "entp", mismatch: "esfp" },
        { mbti: "isfj", perfect: "esfj", mismatch: "infp" },
        { mbti: "isfp", perfect: "enfj", mismatch: "infp" },
        { mbti: "istp", perfect: "enfj", mismatch: "infp" },
        { mbti: "istj", perfect: "estj", mismatch: "enfj" },
      ];

      let perfect;
      let mismatch;
      for (let i = 0; i < mbtiType.length; i++) {
        if (mbtiType[i].mbti === type) {
          perfect = mbtiType[i].perfect;
          mismatch = mbtiType[i].mismatch;
        }
      }

      console.log("-----------------------------------", perfect, mismatch);

      if (word == "p") return perfect;
      else return mismatch;
    },
    sharePage() {},
  },
};
</script>
<style>
.perfect {
  color: rgb(61, 192, 209);
}

.item {
  max-width: 80%;
  padding: 14px 0 22px;
}
@import url(//fonts.googleapis.com/earlyaccess/jejumyeongjo.css);

.jm-font {
  font-family: "Jeju Myeongjo", serif;
  color: rgb(110, 79, 20);
}
</style>
