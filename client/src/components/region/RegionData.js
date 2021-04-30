import React from 'react';

const RegionData = (props) => {
    let region = props.region;//the region itself

    let name = '';
    let capital = '';
    let leader = '';
    let landmarks = [];
    let subregions = 0;

    //direct info
    if(region){
        name = region.name;
        capital = region.capital;
        leader = region.leader;

        landmarks = region.landmarks;
        subregions = (landmarks)? landmarks.length: 0;
    }

    return(
        <div>
            <div className="viewer-text">Region Name:</div>
            <div className="viewer-text">Region Name:</div>
        </div>
    )
}

export default RegionData;