package dev.alphasow.headless_cms.authority;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface AuthorityMapper {
    AuthorityDTO authorityEntityToAuthorityDto(AuthorityEntity authorityEntity);
    AuthorityEntity authorityDtoToAuthorityEntity(AuthorityDTO authorityDTO);
}
