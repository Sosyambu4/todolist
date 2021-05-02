import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    status: (id: string, newIsDoneValue: boolean, todoListID: string) => void
    todoListID: string
    title: string
    removeTodoList: (todoListsID: string) => void
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string,todoListID: string) => void

}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")
    const addTask = () => {
        props.addTask(title,props.todoListID);
        setTitle("");
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onClickremoveTodoList = () => props.removeTodoList(props.todoListID)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickFilter = () => props.changeFilter("all",props.todoListID);
    const onActiveClickHandler = () => props.changeFilter("active",props.todoListID);
    const onCompletedClickHandler = () => props.changeFilter("completed",props.todoListID);

    return <div>
        <h3>{props.title}<button onClick={onClickremoveTodoList}>X</button></h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const removeTask = () => props.removeTask(t.id, props.todoListID)

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
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
