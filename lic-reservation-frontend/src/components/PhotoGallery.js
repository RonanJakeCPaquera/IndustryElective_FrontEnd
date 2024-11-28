import React from 'react';
import './PhotoGallery.css'; // Ensure you have a CSS file for gallery styling

const PhotoGallery = () => {
  // Paths to images stored in the public folder
  const images = [
    '/images/photo1.jpg',  // Corrected path
    // '/images/photo2.jpg',
    '/images/photo3.jpg',
    '/images/photo4.jpg',
    '/images/photo5.jpg',
    '/images/photo6.jpg',
    '/images/photo7.jpg',
    '/images/photo8.jpg',
    '/images/photo9.jpg',
    
  ];

  return (
    <div className="photo-gallery">
      <h2>Photo Gallery</h2>
      <div className="gallery-grid">
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Gallery ${index + 1}`} className="gallery-image" />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
