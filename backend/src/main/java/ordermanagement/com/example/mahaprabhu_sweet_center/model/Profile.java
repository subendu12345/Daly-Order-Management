package ordermanagement.com.example.mahaprabhu_sweet_center.model;

import jakarta.persistence.*;
import org.springframework.lang.NonNull;

import java.util.List;

@Entity
@Table(name = "Profile")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @NonNull
    private long id;

    @Column
    private String profilename;

    @Column
    private boolean haswriteaccess;

    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<User> users;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getProfilename() {
        return profilename;
    }

    public void setProfilename(String profilename) {
        this.profilename = profilename;
    }

    public boolean isHaswriteaccess() {
        return haswriteaccess;
    }

    public void setHaswriteaccess(boolean haswriteaccess) {
        this.haswriteaccess = haswriteaccess;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
