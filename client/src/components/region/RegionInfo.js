import React from 'react'
import RegionData from './RegionData'
import RegionOptions from './RegionOptions'

const RegionInfo = (props) => {
    return(
    <div className='region-container-inner'>
        <RegionOptions region={props.region} user={props.user}
        redirect={props.redirect} left={props.left} right={props.right}/>
        <div className="viewer-text">
            <img src='The World/Logo2.JPG' width="500" height="300"/>
        </div>
        <RegionData region={props.region} allRegions={props.allRegions}
        redirect={props.redirect} user={props.user}
        />
    </div>);
}

export default RegionInfo;