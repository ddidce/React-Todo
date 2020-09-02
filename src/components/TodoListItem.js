import React from 'react';
import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({todo, onRemove, onToggle}) => {
    const {text, checked, id} = todo;
    console.log(`내용 : ${text}, 체크여부 : ${checked}, id값 : ${id}`);
    return (
        <div className="TodoListItem">
            <div className={cn('checkbox', { checked })} onClick={() => onToggle(id)}>
            {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
            <div className="text">{text}</div>
                <div className="remove" onClick={() => onRemove(id)}>
                    <MdRemoveCircleOutline />
                </div>
            </div>
        </div>
    )
}

export default TodoListItem
