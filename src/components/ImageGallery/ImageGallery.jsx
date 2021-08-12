import React from "react";
import PropTypes from "prop-types";

import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

function ImageGallery({ images, openModal }) {
  return (
    <ul className="ImageGallery">
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          tags={tags}
          webformatURL={webformatURL}
          openModal={() => openModal(largeImageURL, tags)}
        ></ImageGalleryItem>
      ))}
    </ul>
  );
}

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};
