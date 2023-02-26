package com.vc.todo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "User with given credentials already exists")
public class UserAlreadyExists extends Throwable{
}
