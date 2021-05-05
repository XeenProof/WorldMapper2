import React, { useState } from 'react'
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const SpreadsheetEntry = (props) => {
    const [editing, setEditing] = useState('');

    let region = props.region;

    let _id = region._id;
    let info = [];
    info['name'] = region.name;
    info['capital'] = region.capital;
    info['leader'] = region.leader;

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
        props.setShowDelete(_id);
    }

    const handleEnter = () => {
        props.redirect(`/spreadsheet/${_id}`);
    }

    const handleViewer = () => {
        props.redirect(`/region/${_id}`);
    }

    const toggleEdit = (edit) =>{
        setEditing(edit);
        console.log(editing);
    }

    const handleEdit = (e) => {
        const { name, value } = e.target;
        const newInfo = value;
        const prevInfo = info[name];
        props.updateRegionField(_id, name, prevInfo, newInfo);
        setEditing('');
    }

    const wip = () => {};
    return(
    <WRow className='table-entry'>
        <WCol size="3" className='flexlr ss-rborder'>
            <div className='ss-text-centered flexlr'>
            <WButton className='transparent-button' >
                <i className='ss-button ss-text-centered3 material-icons' onClick={handleDelete}>delete</i>
            </WButton>
            {(editing == 'name')? <WInput
                className='table-input' onBlur={handleEdit} name='name'
                autoFocus={true} defaultValue={info['name']} type='text'
                wType="outlined" barAnimation="solid" inputClass="table-input-class"
            />: <div className="ss-text ss-text-centered2 ss-color" onClick={() =>  toggleEdit('name')}>
                {info['name']}
            </div>}
            <WButton className='transparent-button' >
                <i className='ss-button ss-text-centered3 material-icons' onClick={handleEnter}>explore</i>
            </WButton>
            </div>
        </WCol>
        <WCol size="2" className='flexlr ss-rborder'>
            {(editing == 'capital')? <WInput
                className='table-input' onBlur={handleEdit} name='capital'
                autoFocus={true} defaultValue={info['capital']} type='text'
                wType="outlined" barAnimation="solid" inputClass="table-input-class"
            />:<div className="ss-text ss-text-centered" onClick={() =>  toggleEdit('capital')}>
                {info['capital']}
            </div>}
        </WCol>
        <WCol size="2" className='flexlr ss-rborder'>
            {(editing == 'leader')? <WInput
                className='table-input' onBlur={handleEdit} name='leader'
                autoFocus={true} defaultValue={info['leader']} type='text'
                wType="outlined" barAnimation="solid" inputClass="table-input-class"
            />:
            <div className="ss-text ss-text-centered" onClick={() =>  toggleEdit('leader')}>
                {info['leader']}
            </div>}
        </WCol>
        <WCol size="1" className='flexlr ss-rborder'>
            <div>
                <img src='The World/Logo2.JPG' width="80" height="40"/>
            </div>
        </WCol>
        <WCol size="4" className='flexlr ss-rborder'>
            <div className="ss-text ss-text-centered ss-color" onClick={handleViewer}>
                {landmarks}
            </div>
        </WCol>
    </WRow>

    );
}
//src='The World/North America/United States Flag.png'
export default SpreadsheetEntry;