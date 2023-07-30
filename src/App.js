import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import './Slideshow.css';

function App() {
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    async function fetchAll(i) {
      await axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=a11674613875c12d18b44c52985decdc&language=hi&page=${i}&with_original_language=hi&sort_by=popularity.desc&include_adult=true`
        )
        .then((res) => {
          const data = res.data.results;
          setAllMovies((prev) => [...prev, ...data]);
        });
    }
    for (let i = 1; i <= 10; i++) {
      fetchAll(i);
    }
  }, []);

  return (
    <div className='change'>
      <Slideshow images={allMovies} interval={3000} />
    </div>
  );
}

const Slideshow = ({ images, interval }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const nextImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const slideshowInterval = setInterval(nextImage, interval + 5000);

    return () => clearInterval(slideshowInterval);
  }, [images, interval]);

  return (
    <div className="slideshow-container change">
        <Display
          key={currentImageIndex}
          image={"https://image.tmdb.org/t/p/original" + images[currentImageIndex]?.backdrop_path}
          text={images[currentImageIndex]?.original_title || "Default Text"}
        />
    </div>
  );
};

function Display({ image, text }) {

  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`slideshow-item active`}
      style={{ backgroundImage: `url(${image})` }}
    >
    {showText && (
        <div className="text-overlay">
        {text}
        </div>
      )}
    </div>
  );
}

export default App;
