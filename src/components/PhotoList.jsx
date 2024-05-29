import React from 'react';
import PropTypes from 'prop-types';
import Photo from './Photo';

const PhotoList = ({ photos, pageTitle}) => {

  return (
    <div className="photo-container">
      <h2>{pageTitle}</h2>
      <ul>
        {photos.map(photo => (
          <Photo
            key={photo.id}
            url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
          />
        ))}
      </ul>
    </div>
  );
};

PhotoList.propTypes = {
  photos: PropTypes.array.isRequired,
  pageTitle: PropTypes.string,
};

export default PhotoList;
