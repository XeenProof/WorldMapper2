import React from 'react'
import RegionData from './RegionData'
import RegionOptions from './RegionOptions'

const RegionInfo = (props) => {
    return(
    <div className='region-container-inner'>
        <RegionOptions region={props.region} user={props.user}
        redirect={props.redirect}/>
        <div className="viewer-text">Image</div>
        <RegionData region={props.region} allRegions={props.allRegions}
        redirect={props.redirect} user={props.user}
        />
    </div>);
}

export default RegionInfo;