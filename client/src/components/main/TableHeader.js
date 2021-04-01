import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';

const TableHeader = (props) => {

    const buttonStyle = props.disabled ? ' table-header-button-disabled ' : 'table-header-button ';
    const undoStyle = props.canUndo ? ' table-header-button ' : 'table-header-button-disabled ';
    const redoStyle = props.canRedo ? ' table-header-button ' : 'table-header-button-disabled ';

    const clickDisabled = () => { };

    const handleDescriptionSorting = () => {
        //console.log("text clicked");
        props.sortList("description");
    };

    const handleDueDateSorting = () => {
        //console.log("due date clicked");
        props.sortList("due_date");
    };

    const handleCompleteSorting = () => {
        //console.log("status clicked");
        props.sortList("completed");
    };

    const handleUserSorting = () => {
        //console.log("user clicked");
        props.sortList("assigned_to");
    };
    //{/*onClick={props.disabled ? clickDisabled() : props.sortList("description")}*/}
    return (
        <WRow className="table-header">
            <WCol size="3" >
                <WButton className='table-header-section' onClick={props.disabled ? clickDisabled() : handleDescriptionSorting} wType="texted" ><div>Task</div></WButton>
            </WCol>

            <WCol size="2" >
                <WButton className='table-header-section' onClick={props.disabled ? clickDisabled() : handleDueDateSorting} wType="texted" ><div>Due Date</div></WButton>
            </WCol>

            <WCol size="2" >
                <WButton className='table-header-section' onClick={props.disabled ? clickDisabled() : handleCompleteSorting} wType="texted" ><div>Status</div></WButton>
            </WCol>

            <WCol size="2" >
                <WButton className='table-header-section' onClick={props.disabled ? clickDisabled() : handleUserSorting} wType="texted"  ><div>Assigned To</div></WButton>
            </WCol>

            <WCol size="3">
                <div className="table-header-buttons">
                    <WButton className={`${undoStyle}`} onClick={props.canUndo? props.undo : clickDisabled} wType="texted" clickAnimation="ripple-light" shape="rounded">
                            <i className="material-icons">undo</i>
                    </WButton>
                    <WButton className={`${redoStyle}`} onClick={props.canRedo? props.redo : clickDisabled} wType="texted" clickAnimation="ripple-light" shape="rounded">
                            <i className="material-icons">redo</i>
                    </WButton>
                    <WButton onClick={props.disabled ? clickDisabled : props.addItem} wType="texted" className={`${buttonStyle}`}>
                        <i className="material-icons">add_box</i>
                    </WButton>
                    <WButton onClick={props.disabled ? clickDisabled : props.setShowDelete} wType="texted" className={`${buttonStyle}`}>
                        <i className="material-icons">delete_outline</i>
                    </WButton>
                    <WButton onClick={props.disabled ? clickDisabled : () => props.closeList()} wType="texted" className={`${buttonStyle}`}>
                        <i className="material-icons">close</i>
                    </WButton>
                </div>
            </WCol>

        </WRow>
    );
};

export default TableHeader;