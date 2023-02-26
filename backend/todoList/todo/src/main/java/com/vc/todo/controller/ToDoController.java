package com.vc.todo.controller;


import com.vc.todo.domain.Item;
import com.vc.todo.domain.Todo;
import com.vc.todo.exception.UserAlreadyExists;
import com.vc.todo.service.SequenceGeneratorService;
import com.vc.todo.service.ToDoService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/list")
public class ToDoController {

    private ToDoService toDoService;

    private SequenceGeneratorService sequenceGeneratorService;

    private ResponseEntity<?> responseEntity;
    String email;

    @Autowired
    public ToDoController(ToDoService toDoService, SequenceGeneratorService sequenceGeneratorService) {
        this.toDoService = toDoService;
        this.sequenceGeneratorService = sequenceGeneratorService;
    }






    @GetMapping("/todo/getAll")
    public ResponseEntity<?> getAll(HttpServletRequest request){
        Claims claims = (Claims) request.getAttribute("claims");
         email = claims.getSubject();
         return new ResponseEntity<>(toDoService.findAll(),HttpStatus.OK);

    }

    @PostMapping("/todo/newList")
    public ResponseEntity<?> createList(@RequestBody Todo todo, HttpServletRequest request)  {
        ResponseEntity responseEntity = null;
        try {
            System.out.println(request);
            Claims claims = (Claims) request.getAttribute("claims");
            String email = claims.getSubject();
            System.out.println("Claim : "+ claims);
            todo.setAdmin(email);
            todo.setId(sequenceGeneratorService.generateSequence(todo.SEQUENCE_NAME));

            responseEntity = new ResponseEntity(toDoService.createTodoList(todo), HttpStatus.OK);

        }catch (Exception e)
        {
            e.printStackTrace();
        }
        return responseEntity;
    }


    @PostMapping("/todo/addItem/{id}")
    public ResponseEntity<?> addTask(@RequestBody Item item, @PathVariable int id) {
        return new ResponseEntity(toDoService.addItem(id,item,email),HttpStatus.OK);
    }
    @GetMapping("/todo/getmylist")
    public ResponseEntity<?> getProjectDetails(HttpServletRequest request) {


            Claims claims = (Claims) request.getAttribute("claims");
            email = claims.getSubject();
            System.out.println("user email from claims :: " + claims.getSubject());
            System.out.println("email " + email);
            System.out.println("email in user " + email);

            responseEntity = new ResponseEntity<>(toDoService.findByAdmin(email), HttpStatus.OK);

        return responseEntity;
    }


    @DeleteMapping("todo/delete/{id}/{item} ")
    public ResponseEntity<?> deleteItem(@PathVariable int id, @PathVariable String item,HttpServletRequest request){

        Claims claims = (Claims) request.getAttribute("claims");
        String email = claims.getSubject();
        return new ResponseEntity<>(toDoService.deleteItemFromList(id,email,item),HttpStatus.OK);
    }

    @PutMapping("todo/updateItem/{id}")
    public ResponseEntity<?> updateTaskStatus(@PathVariable int id, @RequestBody Item item) {
        ResponseEntity responseEntity1 = null;

        try {
            responseEntity1 =  new ResponseEntity<>(toDoService.updateItemStatus(id,item),HttpStatus.OK);
        }catch (Exception e){
           e.printStackTrace();
        }
        return responseEntity1;

    }

    @PutMapping("todo/update/{id}")
    public ResponseEntity<?> updateList(@PathVariable int id, @RequestBody Todo list) {
        ResponseEntity responseEntity1 = null;

        try {
            responseEntity1 =  new ResponseEntity<>(toDoService.updateList(id,list),HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
        }
        return responseEntity1;

    }

    @DeleteMapping("todo/deleteList/{id}")
    public ResponseEntity<?> deleteList(@PathVariable int id){
        return new ResponseEntity<>(toDoService.deleteList(id),HttpStatus.OK);
    }


}
