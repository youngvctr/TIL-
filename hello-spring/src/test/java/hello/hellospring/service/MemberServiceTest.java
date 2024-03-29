package hello.hellospring.service;

import hello.hellospring.domain.Member;
import hello.hellospring.repository.MemoryMemberRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

// 단위테스트
class MemberServiceTest {
    MemberService memberService;
    MemoryMemberRepository memberRepository;

    @BeforeEach
    public void beforeEach() { //dependency injection (DI)
        memberRepository = new MemoryMemberRepository(); //같은 memory mem
        memberService = new MemberService(memberRepository);
    }
    @AfterEach
    public void afterEach() {
        memberRepository.clearStore();
    }
    @Test
    void 회원가입() {

        //given : 주어진 데이터
        Member member = new Member();
        member.setName("spring");

        //when : 테스트의 경우
        Long saveId = memberService.join(member);

        //then : 검증 결과
        Member findMember = memberService.findOne(saveId).get();
        assertThat(member.getName()).isEqualTo(findMember.getName());
    }


    @Test
    void 중복_회원_예외() {
        //given
        Member member1 = new Member();
        member1.setName("spring");

        Member member2 = new Member();
        member2.setName("spring");
        //when
        memberService.join(member1);
        IllegalStateException e = assertThrows(IllegalStateException.class, () -> memberService.join(member2));

        assertThat(e.getMessage());
//        try {
//            memberService.join(member2);
//            fail();
//        } catch (IllegalStateException e)
//        {
//            assertThat(e.getMessage()).isEqualTo("??이미 존재하는 회원입니다."); //"이미 존재하는 회원입니다."
//        }

        //then

    }

    private void fail() {
    }

    @Test
    void findOne() {
    }
}