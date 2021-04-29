import React from 'react';

const Logo = (props) => {
    let id = props.user? props.user._id: "";
    const handleClick = () => {
        props.redirect(`/maps/${id}`);
    }

    return (
        <div className='logo' onClick={handleClick}>
            The World Data Mapper
        </div>
    );
};

export default Logo;