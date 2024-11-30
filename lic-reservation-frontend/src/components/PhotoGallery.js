import React from 'react';
import './PhotoGallery.css'; // CSS for styling
const PhotoGallery = () => {
  const images = [
    '/images/photo1.jpg',
    '/images/photo2.jpg',
    '/images/photo3.jpg',
    '/images/photo4.jpg',
    '/images/photo5.jpg',
  ];
  return (
<div className="photo-gallery">
<h1>Explore Our Gallery</h1>
<div className="scroll-container">
<div className="scroll-track">
          {images.map((src, index) => (
<img key={index} src={src} alt={`Gallery ${index + 1}`} className="gallery-image" />
          ))}
          {images.map((src, index) => (
<img key={index + images.length} src={src} alt={`Gallery ${index + 1}`} className="gallery-image" />
          ))}
</div>
</div>
</div>
  );
};
export default PhotoGallery;