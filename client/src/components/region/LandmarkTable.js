import React from 'react'
import LandmarkEntry from './LandmarkEntry'

const LandmarkTable = (props) =>{
    let landmarks = props.landmarks;

    return(
        landmarks? <div className='white-text landmark-table landmark-overflow'>{
            landmarks.map(entry => (
                <LandmarkEntry landmark={entry}
                deleteLandmark={props.deleteLandmark}
                updateLandmark={props.updateLandmark}
                />
            ))
        }</div>: 
        <div className='white-text landmark-table landmark-overflow'>
        </div>
    )
}

export default LandmarkTable;