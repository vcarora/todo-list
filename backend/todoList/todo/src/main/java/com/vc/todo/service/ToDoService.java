package com.vc.todo.service;


import com.vc.todo.domain.Item;
import com.vc.todo.domain.Todo;
import com.vc.todo.exception.UserAlreadyExists;

import java.util.List;

public interface ToDoService {


  Todo createTodoList(Todo todo);

  Todo deleteItemFromList(int listId,String email,String item);

  Todo addItem(int listId,Item item,String email) ;

  Todo updateItemStatus(int listId, Item item);

  Todo updateList(int list_id, Todo list);


    List<Todo> findByAdmin(String admin);

    List<Todo> findAll();

    boolean deleteList(int listId);


}
