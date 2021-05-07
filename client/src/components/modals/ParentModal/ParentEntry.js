import React 	from 'react';

const ParentEntry = (props) => {
    let display = props.entry;
    let name = display.name;
    let _id = display._id;

    const handleClick = (id) => {
        props.setId(id);
    }

    console.log(name);
    return (<div className='Parent-entry' onClick={() => handleClick(_id)}>
        <div>
        {name}
        </div>
    </div>
    );
}

export default ParentEntry;