import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';
//const ObjectId = require('mongoose').Types.ObjectId;

const TableEntry = (props) => {
    const { data } = props;
    //const owner = props.owner;
    //console.log(owner);

    const completeStyle = data.completed ? ' complete-task' : ' incomplete-task';
    const assignStyle = data.completed ? ' assign-complete' : ' assign-incomplete';

    const description = data.description;
    const due_date = data.due_date;
    const status = data.completed ? 'complete' : 'incomplete';
    const assign = data.assigned_to;
    //console.log(ObjectId(user));

    

    const [editingDate, toggleDateEdit] = useState(false);
    const [editingDescr, toggleDescrEdit] = useState(false);
    const [editingStatus, toggleStatusEdit] = useState(false);
    const [editingAssign, toggleAssignEdit] = useState(false);

    //disabling buttons
    const clickDisabled = () => { };
    const upStyle = props.canMoveUp? 'table-entry-button' : 'table-entry-button-disabled' 
    const downStyle = props.canMoveDown? 'table-entry-button' : 'table-entry-button-disabled' 

    const handleDateEdit = (e) => {
        toggleDateEdit(false);
        const newDate = e.target.value ? e.target.value : 'No Date';
        const prevDate = due_date;
        if (newDate == prevDate){
            return;
        }
        props.editItem(data._id, 'due_date', newDate, prevDate);
    };

    const handleDescrEdit = (e) => {
        toggleDescrEdit(false);
        const newDescr = e.target.value ? e.target.value : 'No Description';
        const prevDescr = description;
        if (newDescr == prevDescr){
            return;
        }
        props.editItem(data._id, 'description', newDescr, prevDescr);
    };

    const handleStatusEdit = (e) => {
        toggleStatusEdit(false);
        const newStatus = e.target.value ? e.target.value : false;
        const prevStatus = status;
        if (newStatus == prevStatus){
            return;
        }
        props.editItem(data._id, 'completed', newStatus, prevStatus);
    };

    const handleAssignEdit = (e) => {
        toggleAssignEdit(false);
        const newAssign = e.target.value ? e.target.value : 'No Assigned';
        const prevAssign = assign;
        if (newAssign == prevAssign){
            return;
        }
        props.editItem(data._id, 'assigned_to', newAssign, prevAssign);
    };

    return (
        <WRow className='table-entry'>
            <WCol size="3">
                {
                    editingDescr || description === ''
                        ? <WInput
                            className='table-input' onBlur={handleDescrEdit}
                            autoFocus={true} defaultValue={description} type='text'
                            wType="outlined" barAnimation="solid" inputClass="table-input-class"
                        />
                        : <div className="table-text"
                            onClick={() => toggleDescrEdit(!editingDescr)}
                        >{description}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingDate ? <input
                        className='table-input' onBlur={handleDateEdit}
                        autoFocus={true} defaultValue={due_date} type='date'
                        wType="outlined" barAnimation="solid" inputClass="table-input-class"
                    />
                        : <div className="table-text"
                            onClick={() => toggleDateEdit(!editingDate)}
                        >{due_date}
                        </div>
                }
            </WCol>

            <WCol size="2">
                {
                    editingStatus ? <select
                        className='table-select' onBlur={handleStatusEdit}
                        autoFocus={true} defaultValue={status}
                    >
                        <option value="complete">complete</option>
                        <option value="incomplete">incomplete</option>
                    </select>
                        : <div onClick={() => toggleStatusEdit(!editingStatus)} className={`${completeStyle} table-text`}>
                            {status}
                        </div>
                }
            </WCol>

            <WCol size="2">
            {
                    editingAssign || assign === ''
                        ? <WInput
                            className='table-input' onBlur={handleAssignEdit}
                            autoFocus={true} defaultValue={assign} type='text'
                            wType="outlined" barAnimation="solid" inputClass="table-input-class"
                        />
                        : <div className={`table-text ${assignStyle}`}
                            onClick={() => toggleAssignEdit(!editingAssign)}
                        >{assign}
                        </div>
                }
                {/* <div className="table-text">{user}</div> */}
            </WCol>

            <WCol size="3">
                <div className='button-group'>
                    <WButton className={`${upStyle}`} onClick={props.canMoveUp? () => props.reorderItem(data._id, -1): clickDisabled()} wType="texted">
                        <i className="material-icons">expand_less</i>
                    </WButton>
                    <WButton className={`${downStyle}`} onClick={props.canMoveDown? () => props.reorderItem(data._id, 1): clickDisabled()} wType="texted">
                        <i className="material-icons">expand_more</i>
                    </WButton>
                    <WButton className="table-entry-button" onClick={() => props.deleteItem(data)} wType="texted">
                        <i className="material-icons">close</i>
                    </WButton>
                </div>
            </WCol>
        </WRow>
    );
};

export default TableEntry;