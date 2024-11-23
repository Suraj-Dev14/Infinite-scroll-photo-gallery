import React from 'react';

const ImageCard = ({ image }) => {
    return (
        <div className="image-card">
            <img src={image.urls.small} alt={image.alt_description} />
            <div className='overlay'>
                <p className="photographer">{image.user.name}</p>
            </div>
        </div>
    );
};

export default ImageCard;