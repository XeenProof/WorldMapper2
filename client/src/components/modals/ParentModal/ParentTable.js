import React 	from 'react';
import ParentEntry from './ParentEntry';

const ParentTable = (props) => {
    let displayList = props.displayList;

    return (
        displayList? <div className="Parent-table">
            {
                displayList.map( entry => (
                    <ParentEntry entry={entry} setId={props.setId}/>
                ))
            }
    </div>
    :<div className="Parent-table"></div>);
}

export default ParentTable;