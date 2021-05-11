import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    /*status: (id: string, newIsDoneValue: boolean, todoListID: string) => void*/
    todoListID: string
    title: string
    removeTodoList: (todoListsID: string) => void
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export function Todolist(props: PropsType) {
    const {filter} = props;
    const onClickremoveTodoList = () => props.removeTodoList(props.todoListID);
    const onAllClickFilter = () => props.changeFilter("all", props.todoListID);
    const onActiveClickHandler = () => props.changeFilter("active", props.todoListID);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todoListID);
    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)
    // const taskClasses: string = t.isDone ?

    return <div>
        <h3>
        <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
            <IconButton onClick={onClickremoveTodoList}><Delete/></IconButton>
            {/*<Button
                onClick={onClickremoveTodoList}>X</Button>*/}
        </h3>
        <AddItemForm addItem={addTask}/>
    <ul style={{listStyle: "none",paddingLeft: '0px'}}> </ul>
        <ul>
            {props.tasks.map(t => {

                const removeTask = () => props.removeTask(t.id, props.todoListID)
                const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                    props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
                const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)


                return <li key={t.id}>
                    <Checkbox
                        color={"primary"}
                        onChange={changeTaskStatus}
                        checked={t.isDone}
                    />
                    {/*<input type="checkbox"
                           onChange={changeTaskStatus}
                           checked={t.isDone}

                          />*/}

                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                    <IconButton
                        color={"secondary"}
                        onClick={removeTask}><Delete/></IconButton>
                </li>
            })
            }
        </ul>
        <div>
            <Button
                onClick={onAllClickFilter}
                color={"primary"}
                size={"small"}
                variant={filter === "all" ? "outlined" : "contained"}>All</Button>

            <Button
                style={{marginLeft: '3px'}}
                size={"small"}
                variant={filter === "active" ? "outlined" : "contained"}
                color={"primary"}
                onClick={onActiveClickHandler}>Active</Button>
            <Button
                size={"small"}
                variant={filter === "completed" ? "outlined" : "contained"}
                color={"primary"}
                onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}
