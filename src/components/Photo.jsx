import React from 'react';
import PropTypes from 'prop-types';

const Photo = ({url}) => {
  return (
    <li>
      <img src={url} alt="" />
    </li>
  )
}

Photo.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Photo