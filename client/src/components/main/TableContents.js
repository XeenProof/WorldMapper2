import React        from 'react';
import TableEntry   from './TableEntry';

const TableContents = (props) => {

    const entries = props.activeList ? props.activeList.items : null;
    const max = entries? entries.length-1: -1;
    return (
        entries ? <div className=' table-entries container-primary'>
            {
                entries.map((entry, index) => (
                    <TableEntry
                        data={entry} key={entry.id}
                        deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                        editItem={props.editItem}
                        canMoveUp={index != 0}
                        canMoveDown={index != max}
                    />
                ))
            }

            </div>
            : <div className='container-primary' />
    );
};

export default TableContents;