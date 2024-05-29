import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Photo from './Photo';

const PhotoList = ({ photos, pageTitle, fetchData, loading}) => {
  const { query } = useParams();

  useEffect(() => {
    if (query) {
      fetchData(query);
    }
  }, [query]);

  let results;
  if (photos.length > 0) {
    results = photos.map(photo => (
      <Photo
        key={photo.id}
        url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
      />
    ));
  } else {
    results = <li>No results found</li>;
  }

  return (
    <div className="photo-container">
      <h2>{query ? query : pageTitle}</h2>
      <ul>
        {
          (loading)
          ? <li>Loading...</li>
          : results
        }
      </ul>
    </div>
  );
};

PhotoList.propTypes = {
  photos: PropTypes.array.isRequired,
  pageTitle: PropTypes.string,
  fetchData: PropTypes.func,
  loading: PropTypes.bool,
};

export default PhotoList;
