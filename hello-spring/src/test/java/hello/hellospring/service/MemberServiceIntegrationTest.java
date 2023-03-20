package hello.hellospring.service;

import hello.hellospring.domain.Member;
import hello.hellospring.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

//통합 테스트
@SpringBootTest
@Transactional
class MemberServiceIntegrationTest {
    @Autowired MemberService memberService;
    @Autowired MemberRepository memberRepository;

    @Test
    //@Commit
    void 회원가입() throws Exception{

        //given : 주어진 데이터
        Member member = new Member();
        member.setName("spring");

        //when : 테스트의 경우
        Long saveId = memberService.join(member);

        //then : 검증 결과
        Member findMember = memberRepository.findById(saveId).get();
        assertEquals(member.getName(), findMember.getName());
    }

    @Test
    void 중복_회원_예외() throws Exception{
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

    private void findMember() {
    }

    @Test
    void findOne() {
    }
}