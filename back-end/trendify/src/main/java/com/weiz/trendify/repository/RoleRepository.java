package com.weiz.trendify.repository;

import com.weiz.trendify.entity.Role;
import com.weiz.trendify.entity.enums.ERole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByRoleName(ERole roleName);
}
