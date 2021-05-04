import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
    /*let [title, setTitle] = useState("")
    const addTask = () => {
        props.addTask(title,props.todoListID);
        setTitle("");
    }*/

    /* const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
          setTitle(e.currentTarget.value)
      }*/
    const onClickremoveTodoList = () => props.removeTodoList(props.todoListID)
    /* const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
         if (e.charCode === 13) {
             addTask();
         }
     }*/

    const onAllClickFilter = () => props.changeFilter("all", props.todoListID);
    const onActiveClickHandler = () => props.changeFilter("active", props.todoListID);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todoListID);
    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)


    return <div>
        <h3>
        <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
            <button onClick={onClickremoveTodoList}>X</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        {/* <div>
            <input value={title}
                   onChange={onChangeTitle}
                   onKeyPress={onKeyPressAddItem}
            />
            <button onClick={addTask}>+</button>
        </div>*/}
        <ul>
            {props.tasks.map(t => {

                const removeTask = () => props.removeTask(t.id, props.todoListID)
                const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                    props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
                const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)


                return <li key={t.id}>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={changeTaskStatus}/>
                    {/*<span>{t.title}</span>*/}

                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                    <button onClick={removeTask}>x</button>
                </li>
            })
            }
        </ul>
        <div>
            <button onClick={onAllClickFilter}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
