import React            from 'react';
import SidebarHeader    from './SidebarHeader';
import SidebarList      from './SidebarList';

const SidebarContents = (props) => {
    console.log("Side bar refreshed");
    return (
        <>
            <SidebarHeader 
                auth={props.auth} createNewList={props.createNewList} 
                listActive={props.listActive}
            />
            <SidebarList
                activeid={props.activeid} handleSetActive={props.handleSetActive}
                todolists={props.todolists} listorder={props.listorder}
                createNewList={props.createNewList}
                updateListField={props.updateListField}
            />
        </>
    );
};

export default SidebarContents;