package hello.hellospring.repository;

import hello.hellospring.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SpringDataJapMemberRepository extends JpaRepository<Member, Long>, MemberRepository {
    //jpql : select m from Member m where m.name = ?
    //jpql : findByNameAndId --> select m from Member m where m.name = ? and m.id = ?
    @Override
    Optional<Member> findByName(String name);
}
