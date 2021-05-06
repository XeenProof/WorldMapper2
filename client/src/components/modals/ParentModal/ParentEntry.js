import React 	from 'react';

const ParentEntry = (props) => {
    let display = props.entry;
    let name = display.name;
    let _id = display._id;

    const handleClick = (id) => {
        props.setId(id);
    }

    return (<div className='Parent-entry' onClick={() => handleClick(_id)}>
        {name};
    </div>
    );
}

export default ParentEntry;