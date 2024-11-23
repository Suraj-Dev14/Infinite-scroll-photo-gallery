import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ImageCard from './ImageCard';
import Loader from './Loader';

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const pageRef = useRef(1);
    
    const fetchImages = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.unsplash.com/photos/?client_id=${"cK2PzZGd-xj91aWnorZLPJ84rZki7VgekNjzeiwWuW8"}&page=${pageRef.current}`);
            setImages((prevImages) => [...prevImages, ...response.data]);
            pageRef.current += 1;
        } catch (err) {
            setError('Error fetching images');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
                fetchImages();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    return (
        <div className="gallery">
            {error && <p className="error">{error}</p>}
            <div className="gallery-grid">
                {images.map((image) => (
                    <ImageCard key={image.id} image={image} />
                ))}
            </div>
            {loading && <Loader />}
        </div>
    );
};

export default ImageGallery;
