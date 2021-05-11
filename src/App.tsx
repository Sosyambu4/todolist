import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {Menu} from "@material-ui/icons";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";


export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}


type TaskStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    //Bll:
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"}])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
        ]
    });


    function removeTask(id: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id != id)
        setTasks({...tasks})
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl))
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title: title} : tl))
    }

    function addTask(title: string, todoListID: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]});
    }

    function changeTaskStatus(id: string, newIsDoneValue: boolean, todoListID: string) {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === id ? {...t, isDone: newIsDoneValue} : t)
        })


    }

    function changeTaskTitle(id: string, newTitle: string, todoListID: string) {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === id ? {...t, title: newTitle} : t)
        })


    }

    function tasksForTodolist(todolist: TodoListType) {
        switch (todolist.filter) {
            case "active":
                return tasks[todolist.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todolist.id].filter(t => t.isDone)
            default:
                return tasks[todolist.id]
        }

    }

    function removeTodoList(todoListsID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListsID))
        delete tasks[todoListsID]
    }

    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {id: newTodoListID, title: title, filter: "all"}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }

    const todoListsComponents = todoLists.map(tl => {
            return (
                <Grid item key={tl.id}>
                <Paper elevation={5} style={{padding: "20px"}}>
                    <Todolist
                        todoListID={tl.id}
                        key={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist(tl)}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        filter={tl.filter}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}

                    />
                </Paper>
                </Grid>
            )
        }
    )

    return (
        <div>
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton color={"inherit"}>
                        <Menu/>
                        </IconButton>
                        <Typography variant={"h6"}>
                            Todolist
                        </Typography>
                        <Button color={"inherit"}
                                variant={"outlined"}
                        >Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0px"}}>
                <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                {todoListsComponents}
                </Grid>
            </Container>
        </div>
);
}

export default App;
