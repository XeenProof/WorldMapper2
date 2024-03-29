import React from 'react'
import RegionData from './RegionData'
import RegionOptions from './RegionOptions'

const RegionInfo = (props) => {
    return(
    <div className='region-container-inner'>
        <RegionOptions user={props.user}
        redirect={props.redirect} left={props.left} right={props.right}
        undo={props.undo} redo={props.redo}/>
        <RegionData region={props.region} allRegions={props.allRegions}
        redirect={props.redirect} user={props.user}
        setChangeParent={props.setChangeParent}
        />
    </div>);
}

export default RegionInfo;