import React from 'react';
import { WButton, WRow, WCol } from 'wt-frontend';

const SpreadsheetTableHeader = (props) => {
    const wip = () => {};

    const handleSort = (field) => {
        props.sortRegion(field);
    }

    return(<WRow className='dark-red-background'>
            <WCol size="3">
                <WButton className='ss-header-button' onClick={() => handleSort('name')} wType="texted" >
                    <div>Name</div>
                </WButton>
            </WCol>
            <WCol size="2">
                <WButton className='ss-header-button' onClick={() => handleSort('capital')} wType="texted" >
                    <div>Capital</div>
                </WButton>
            </WCol>
            <WCol size="2">
                <WButton className='ss-header-button' onClick={() => handleSort('leader')} wType="texted" >
                    <div>Leader</div>
                </WButton>
            </WCol>
            <WCol size="1">
                <WButton className='ss-header-button' wType="texted" >
                    <div>Flag</div>
                </WButton>
            </WCol>
            <WCol size="4">
                <WButton className='ss-header-button' wType="texted" >
                    <div>Landmarks</div>
                </WButton>
            </WCol>
        </WRow>);
}

export default SpreadsheetTableHeader;