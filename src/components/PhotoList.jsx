import React, {useEffect} from 'react';
import Photo from './Photo';

const PhotoList = ({ photos, pageTitle, fetchData }) => {

  useEffect(() => {
    fetchData(pageTitle);
  }, [pageTitle, fetchData]);

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


export default PhotoList;
