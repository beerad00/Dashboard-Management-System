package com.cooksys.groupfinal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cooksys.groupfinal.entities.Company;

import java.util.Set;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {


    @Query("SELECT c FROM Company c JOIN c.employees e WHERE e.id = :userId")
    Set<Company> findByUserId(@Param("userId") Long userId);
}