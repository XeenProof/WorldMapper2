import React from 'react'

const SpreadsheetContents = (props) => {
    let regions = props.children;
    return (
        regions ? <div className=' table-entries container-primary'>
            {/* {
                region.map((entry, index) => (
                    <TableEntry
                        data={entry} key={entry.id}
                        deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                        editItem={props.editItem}
                        canMoveUp={index != 0}
                        canMoveDown={index != max}
                    />
                ))
            } */}

            </div>
            : <div className='container-primary' />
    );
}

export default SpreadsheetContents;