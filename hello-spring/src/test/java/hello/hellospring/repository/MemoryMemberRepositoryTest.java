package hello.hellospring.repository;

import hello.hellospring.domain.Member;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
public class MemoryMemberRepositoryTest {
    MemoryMemberRepository repository = new MemoryMemberRepository();
    @AfterEach
    public void afterEach() {
        repository.clearStore();
    }
    @Test
    public void save(){
    Member member = new Member();
    member.setName("springTest");

    repository.save(member);

    Member result = repository.findById(member.getId()).get();
    assertThat(member).isEqualTo(result); //import static org.assertj.core.api.Assertions.*;
    //assertThat(member).isEqualTo(null);
    //Assertions.assertEquals(result, member); //result, null

    //System.out.println("result = " + (result == member));
    }
    @Test
    public void findByName() {
        Member member1 = new Member();
        member1.setName("spring 1");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("spirng 2");
        repository.save(member2);

        Member result = repository.findByName("spring 1").get();

        assertThat(result).isEqualTo(member1);

    }

    @Test
    public void findAll() {
        Member member1 = new Member();
        member1.setName("spring 1");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("spring 2");
        repository.save(member2);

        List<Member> result = repository.findAll();

        assertThat(result.size()).isEqualTo(2);
    }
}
