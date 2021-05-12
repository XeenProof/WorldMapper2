import React from 'react';

const RegionData = (props) => {

    let region = props.region;//the region itself
    let allRegions = props.allRegions;

    let name = '';
    let capital = '';
    let leader = '';
    let children = [];
    let subregions = 0;

    let parent = {};
    let parentName = '';

    //direct info
    if(region){
        name = region.name;
        capital = region.capital;
        leader = region.leader;
        parent = allRegions.find(x => x._id == region.parent);
        parentName = (parent)? parent.name:'';

        children = region.children;
        if(children){
            for(let i = 0; i < children.length; i++){
                let subRegionId = children[i];
                let subRegion = allRegions.find(x => x._id == subRegionId);
                if(!subRegion){
                    continue;
                }
                let newChildren = subRegion.children;
                children = children.concat(newChildren);
            }
        }
        subregions = (children)? children.length: 0;
    }

    let flag = `../The World/${name} flag.png`

    const handleBack = () => {
        console.log("back");
        if(!region){
            return;
        }
        let id = props.user._id;
        if (parent == 'root'){
            props.redirect(`/maps/${id}`);
        }
        else{
            props.redirect(`/spreadsheet/${parent._id}`);
        }
    };

    return(
        <div>
            <div className="viewer-text">
                <img src={flag} width="500" height="300"/>
            </div>
            <div className="flexlr">
                <div className='viewer-text'>Region Name:</div>
                <div className='viewer-text'>{name}</div>
            </div>
            <div className="flexlr">
                <div className='viewer-text'>Parent Region:</div>
                <div className='viewer-text2 clickable' onClick={handleBack}>{parentName}</div>
                <i className='viewer-entry-button2 viewer-text3 clickable material-icons' onClick={props.setChangeParent}>edit</i>
            </div>
            <div className="flexlr">
                <div className='viewer-text'>Region Capital:</div>
                <div className='viewer-text'>{capital}</div>
            </div>
            <div className="flexlr">
                <div className='viewer-text'>Region Leader:</div>
                <div className='viewer-text'>{leader}</div>
            </div>
            <div className="flexlr">
                <div className='viewer-text'># of Subregions:</div>
                <div className='viewer-text'>{subregions}</div>
            </div>
        </div>
    )
}

export default RegionData;