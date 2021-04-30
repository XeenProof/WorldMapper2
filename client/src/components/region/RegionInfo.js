import React from 'react'
import RegionOptions from './RegionOptions'

const RegionInfo = (props) => {
    return(
    <div className='region-container-inner'>
        <RegionOptions region={props.region} user={props.user}
        redirect={props.redirect}/>
        <div>Image</div>
    </div>);
}

export default RegionInfo;