import React from 'react'
import { WLayout, WLHeader, WLMain, WLFooter, WLSide } from 'wt-frontend';
import { WCard, WCHeader, WCMedia, WCContent, WCFooter } from 'wt-frontend';

const Landmarks = (props) => {
    //Might want to build my own instead of using layouts
    return(
    <div className='region-container-inner'>
        <WLayout wLayout="header-footer" className='landmark-container'>
            <WLHeader className='landmarks-header-text'>
                Region Landmarks:
            </WLHeader>
            <WLMain className='background-test2'>
                body
            </WLMain>
            <WLFooter className='background-test3 landmark-footer-size'>
                footer
            </WLFooter>
        </WLayout>
    </div>
    );
}

export default Landmarks;