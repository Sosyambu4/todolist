import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";
import {Input} from "@material-ui/icons";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement> ) => setTitle(e.currentTarget.value)
    return (
        editMode
            ? <input
                color={'primary'}
                value={title}
                autoFocus
                onChange={onChangeTitle}
                onBlur={offEditMode}
            />
        /*? <input
            value={title}
            autoFocus
            onChange={onChangeTitle}
            onBlur={offEditMode}
            />*/
        : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}
export default EditableSpan;