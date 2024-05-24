import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Photo from './Photo';

const PhotoList = ({ photos, query, fetchData }) => {
  useEffect(() => {
    fetchData(query);
  }, [query, fetchData]);

  return (
    <div className="photo-container">
      <h2>Results</h2>
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
  query: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired
};

export default PhotoList;
