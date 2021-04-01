import React                    from 'react';
import { WButton, WRow, WCol }  from 'wt-frontend';

const SidebarHeader = (props) => {
    const clickDisabled = () => { };
    const visable = props.listActive ? "hidden": "";


    return (
        <WRow className='sidebar-header'>
            <WCol size="7">
                <WButton wType="texted" hoverAnimation="text-primary" className='sidebar-header-name'>
                    Todolists
                </WButton>
            </WCol>

            <WCol size="5">
                {
                    props.auth && <div className="sidebar-options">
                        <WButton className={`sidebar-buttons ${visable}` } onClick={props.listActive ? clickDisabled: props.createNewList} clickAnimation="ripple-light" shape="rounded">
                            <i className="material-icons">add</i>
                        </WButton>
                    </div>
                }
            </WCol>

        </WRow>

    );
};

export default SidebarHeader;