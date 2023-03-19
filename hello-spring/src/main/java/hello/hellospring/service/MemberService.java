package hello.hellospring.service;

import hello.hellospring.domain.Member;
import hello.hellospring.repository.MemberRepository;
import hello.hellospring.repository.MemoryMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//@Service
public class MemberService {
    private final MemberRepository memberRepository;
    //@Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }
    
    /* 회원 가입 */
    public Long join(Member member){
        // 중복 회원(이름이 같은 경우)
        validateDuplicateMember(member);
        //result.get(); | 값을 바로 꺼냄
        //result
        memberRepository.save(member);
        return member.getId();
    }

    //ctrl + alt + m | method로 뽑아냄.
    private void validateDuplicateMember(Member member) {
        memberRepository.findByName(member.getName()) //optional member이므로 다음 실행문을 작성함.
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                }); //short) ctrl + alt + v
    }

    // 비즈니스 메서드
    /*
    * 전체 회원 조회
    * */
    public List<Member> findMember() {
        //서비스는 비즈니스에 맞도록 네이밍을 잡는다.
        return memberRepository.findAll();
    }

    public Optional<Member> findOne(Long memberId) {
        return memberRepository.findById(memberId);
    }
}
