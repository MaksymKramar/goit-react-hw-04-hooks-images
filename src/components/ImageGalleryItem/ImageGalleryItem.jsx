import React from "react";
import PropTypes from "prop-types";

function ImageGalleryItem({ tags, webformatURL, openModal }) {
  return (
    <li className="ImageGalleryItem" onClick={openModal}>
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
    </li>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
