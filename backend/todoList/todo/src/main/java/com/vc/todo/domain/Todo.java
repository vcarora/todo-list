package com.vc.todo.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Transient;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document
public class Todo {

    @Transient
    public static final String SEQUENCE_NAME = "list_sequence";

    @Id
    private long id;
    private String list_name;
    private String admin;
    private String description;
    private List<Item> itemList;
}
