import React from 'react'
import { WLayout, WLHeader, WLMain, WLFooter } from 'wt-frontend';
import LandmarkFooter from './LandmarkFooter';
import LandmarkTable from './LandmarkTable';


const Landmarks = (props) => {
    //let landmarks = props.landmarks;

    return(
    <div className='region-container-inner'>
        <WLayout wLayout="header-footer" className='landmark-container'>
            <WLHeader className='landmarks-header-text'>
                Region Landmarks:
            </WLHeader>
            <WLMain className='landmark-body-settings'>
                <LandmarkTable landmarks={props.landmarks}
                deleteLandmark={props.deleteLandmark}
                updateLandmark={props.updateLandmark}
                />
            </WLMain>
            <WLFooter className='landmark-footer-settings'>
                <LandmarkFooter
                addLandmark={props.addLandmark}
                />
            </WLFooter>
        </WLayout>
    </div>
    );
}

export default Landmarks;