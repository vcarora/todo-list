package com.vc.todo.service;


import com.vc.todo.domain.Item;
import com.vc.todo.domain.Todo;
import com.vc.todo.exception.UserAlreadyExists;
import com.vc.todo.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class ToDoServiceImpl implements ToDoService {


    private ToDoRepository repository;

    @Autowired
    public ToDoServiceImpl( ToDoRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Todo> findByAdmin(String admin) {
        return repository.findByAdmin(admin);
    }


    @Override
    public Todo createTodoList(Todo todo) {

       return repository.save(todo);
    }

    @Override
    public Todo deleteItemFromList(int listId, String email, String item) {
        Todo list = repository.findById(listId).get();
        if(list.getAdmin().equals(email)){
            List<Item> items = list.getItemList();
            items.removeIf(x -> x.getName().equals(item));
            list.setItemList(items);
        }

        return repository.save(list);
    }

    @Override
    public Todo addItem(int listId, Item item, String email) {
        Todo list = repository.findById(listId).get();

                if(list.getItemList() == null)
                    list.setItemList(Arrays.asList(item));
                else {
                    List<Item> itemList = list.getItemList();
                    itemList.add(item);
                    list.setItemList(itemList);
                }
         return repository.save(list);
    }

    @Override
    public Todo updateItemStatus(int listId, Item item) {
        Todo list = repository.findById(listId).get();

        List<Item> itemList = list.getItemList();
       for(Item item1 : itemList){
           if(item1.getName().equals(item.getName()))
               item1.setStatus(item.getStatus());
       }
       list.setItemList(itemList);
        return repository.save(list);
    }

    @Override
    public Todo updateList(int listId, Todo list) {
        Todo list1 = repository.findById(listId).get();

        list1.setList_name(list.getList_name());
        list1.setDescription(list.getDescription());
        return repository.save(list1);
    }

    @Override
    public List<Todo> findAll() {
        return repository.findAll();
    }

    @Override
    public boolean deleteList(int listId) {
         repository.deleteById(listId);
         return true;
    }
}
