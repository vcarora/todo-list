package com.vc.todo.repository;

import com.vc.todo.domain.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ToDoRepository extends MongoRepository<Todo,Integer> {
   List<Todo> findByAdmin(String admin);

}
