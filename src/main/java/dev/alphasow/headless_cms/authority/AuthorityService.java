package dev.alphasow.headless_cms.authority;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthorityService {
    
    final AuthorityRepository authorityRepository;
    final AuthorityMapper authorityMapper;
    
    public AuthorityDTO getUsersAuthority(String username){
       return  authorityMapper.authorityEntityToAuthorityDto(authorityRepository.findById(username)
               .orElseThrow(()-> new AuthorityNotFoundException("Authority not found")));
    }

    public AuthorityDTO updateUserAuthority(AuthorityDTO authorityDTO) {
        final AuthorityEntity authority = authorityRepository
                .save(authorityMapper.authorityDtoToAuthorityEntity(authorityDTO));
        return authorityMapper.authorityEntityToAuthorityDto(authority);
    }
}
