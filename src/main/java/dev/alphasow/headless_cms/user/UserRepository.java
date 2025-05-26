package dev.alphasow.headless_cms.user;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserRepository extends PagingAndSortingRepository<UserEntity, String>, CrudRepository<UserEntity, String> {
}