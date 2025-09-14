package loanapp.backend.Entity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collections;


public class UserPrincipal implements UserDetails {

    private UserEntity user;

    public UserPrincipal( UserEntity user) {
        this.user = user;
    }

    @Override
    public java.util.Collection<? extends GrantedAuthority> getAuthorities() {
// SingletonSet<SimpleGrantedAuthority> grantesAuthority=java.util.Collections.singleton(new SimpleGrantedAuthority("USER"));
//         Collections.singletonIterator<SimpleGrantedAuthority> it=grantesAuthority.iterator();
//         while(it.hasNext()){
//             System.out.println(it.next().getAuthority());
//         }        
         return Collections.singleton(new SimpleGrantedAuthority("USER"));
     }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}