package dev.alphasow.headless_cms.user;

import dev.alphasow.headless_cms.authority.AuthorityEntity;
import dev.alphasow.headless_cms.authority.AuthorityDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper instance = Mappers.getMapper(UserMapper.class);

    default Page<UserDTO> pageUserModelToPageUserDto(Page<UserEntity> pageUserModel) {
        List<UserDTO> userDtoList = pageUserModel.getContent().stream()
                .map(this::userDataToUserDto)
                .toList();
        return new PageImpl<>(userDtoList, pageUserModel.getPageable(), pageUserModel.getTotalElements());
    }
    
    UserDTO userDataToUserDto(UserEntity userData);
    
    Set<AuthorityDTO> userAuthorityToUserAuthorityDto(Set<AuthorityEntity> userAuthoritySet);
}
