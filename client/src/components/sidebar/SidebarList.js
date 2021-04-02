import React        from 'react';
import SidebarEntry from './SidebarEntry';

const SidebarList = (props) => {
    return (
        <>
            {
                props.listorder &&
                props.listorder.map(todo => (
                    <SidebarEntry
                        handleSetActive={props.handleSetActive} activeid={props.activeid}
                        id={props.todolists.find(e => e._id.toString() === todo).id} 
                        key={props.todolists.find(e => e._id.toString() === todo).id} 
                        name={props.todolists.find(e => e._id.toString() === todo).name} 
                        _id={props.todolists.find(e => e._id.toString() === todo)._id}
                        updateListField={props.updateListField}
                    />
                ))
            }
        </>
    );
};

export default SidebarList;