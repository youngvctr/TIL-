package hello.hellospring;

import hello.hellospring.aop.TimeTraceAop;
import hello.hellospring.repository.MemberRepository;
import hello.hellospring.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfig {

    private final MemberRepository memberRepository;

    @Autowired
    public SpringConfig(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    //private final DataSource dataSource;
    //@PersistenceContext
//    private final EntityManager em;
//    @Autowired
//    public SpringConfig(EntityManager em) {
//        this.em = em;
//    }
    //public SpringConfig(DataSource dataSource){
    //    this.dataSource = dataSource;
    //}

    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository);//memberRepository());
    }

    //@Bean
    public TimeTraceAop timeTraceAop () {
        return new TimeTraceAop();
    }
//    @Bean
//    public MemberRepository memberRepository() {
//                //new JdbcMemberRepository(dataSource);
//                //MemoryMemberRepository();
//                //JdbcTemplateMemberRepository(dataSource);
//        return new JpaMemberRepository(em);
//    }


}
