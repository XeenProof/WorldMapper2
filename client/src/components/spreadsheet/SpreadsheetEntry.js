import React from 'react'
import { WButton, WRow, WCol } from 'wt-frontend';

const SpreadsheetEntry = (props) => {
    let region = props.region;

    let _id = region._id;
    let name = region.name;
    let capital = region.capital;
    let leader = region.leader;
    let flag = 'temp';

    let landmarkSet = props.landmarks;
    let landmarks = "...";
    if(landmarkSet){
        if (landmarkSet.length == 1){
            landmarks = landmarkSet[0];
        }
        if (landmarkSet.length > 1){
            landmarks = landmarkSet[0] + ",...";
        }
    }

    const handleDelete = () => {
        props.deleteSubregion(_id);
    }

    const wip = () => {};
    return(
    <WRow className='table-entry'>
        <WCol size="3" className='flexlr ss-rborder'>
            <div className='ss-text-centered flexlr'>
            <WButton className='transparent-button' >
                <i className='ss-button ss-text-centered3 material-icons' onClick={handleDelete}>delete</i>
            </WButton>
            <div className="ss-text ss-text-centered2 ss-color" onClick={wip}>
                {name}
            </div>
            <WButton className='transparent-button' >
                <i className='ss-button ss-text-centered3 material-icons' onClick={handleDelete}>explore</i>
            </WButton>
            </div>
        </WCol>
        <WCol size="2" className='flexlr ss-rborder'>
            <div className="ss-text ss-text-centered" onClick={wip}>
                {capital}
            </div>
        </WCol>
        <WCol size="2" className='flexlr ss-rborder'>
            <div className="ss-text ss-text-centered" onClick={wip}>
                {leader}
            </div>
        </WCol>
        <WCol size="1" className='flexlr ss-rborder'>
            <div className="ss-text ss-text-centered" onClick={wip}>
                {flag}
            </div>
        </WCol>
        <WCol size="4" className='flexlr ss-rborder'>
            <div className="ss-text ss-text-centered ss-color" onClick={wip}>
                {landmarks}
            </div>
        </WCol>
    </WRow>

    );
}

export default SpreadsheetEntry;