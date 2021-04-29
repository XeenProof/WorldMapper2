import React from 'react';
import { WButton, WRow, WCol } from 'wt-frontend';

const SpreadsheetTableHeader = (props) => {
    const wip = () => {};
    return(<WRow className='dark-red-background'>
            <WCol size="3">
                <WButton className='ss-header-button' onClick={wip} wType="texted" >
                    <div>Name 3</div>
                </WButton>
            </WCol>
            <WCol size="2">
                <WButton className='ss-header-button' onClick={wip} wType="texted" >
                    <div>Capital 2</div>
                </WButton>
            </WCol>
            <WCol size="2">
                <WButton className='ss-header-button' onClick={wip} wType="texted" >
                    <div>Leader 2</div>
                </WButton>
            </WCol>
            <WCol size="1">
                <WButton className='ss-header-button' onClick={wip} wType="texted" >
                    <div>Flag 1</div>
                </WButton>
            </WCol>
            <WCol size="4">
                <WButton className='ss-header-button' onClick={wip} wType="texted" >
                    <div>Landmarks 4</div>
                </WButton>
            </WCol>
        </WRow>);
}

export default SpreadsheetTableHeader;