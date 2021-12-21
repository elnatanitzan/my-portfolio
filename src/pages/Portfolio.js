import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import { Cards } from '../components/ProjectList';

import './Portfolio.css';

const Card = styled.div`
    heigth: 700px;
    width: 700px;
    @media (max-width: 400px) {
        width: 310px;
    }
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: #252525;
    border-radius: 8px 8px 2px 2px;
    z-index: 11;
    text-align: center;
    overflow: hidden;
    position: relative;
`;

const Img = styled.img`
    width: 100%;
    max-width: 700px;
    height: auto;
    @media (max-width: 400px) {
        max-width: 310px;
    }
`;

const slides = [...Cards].map((card) => ({
    key: card.title,
    content: <Card key={card.title}>
                    <Img src={card.src}  alt={card.title} />
                    <h2>{card.title}</h2>
                    <h4>{card.details}</h4>
             </Card>, 
}));

export default function Porfolio() {

    const [offsetRadius, setOffsetRadius] = useState(2);
    const [showArrows, setShowArrows] = useState(true);
    const [goToSlide, setGoToSlide] = useState(null);
    const table = slides.map((element, index) => {
        return { ...element, onClick: () => setGoToSlide(index) };
    });
    const [cards] = useState(table);
    
    useEffect(() => {
        setOffsetRadius(offsetRadius);
        setShowArrows(showArrows);
    }, [offsetRadius, showArrows]);

    let xDown = null;
    let yDown = null;

    const getTouches = (e) => {
        return (
        e.touches || e.originalEvent.touches // browser API
        ); // jQuery
    };

    const handleTouchStart = (e) => {
        const firstTouch = getTouches(e)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    };

    const handleTouchMove = (e) => {
        if (!xDown || !yDown) {
        return;
        }

        let xUp = e.touches[0].clientX;
        let yUp = e.touches[0].clientY;

        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
        /*most significant*/
        if (xDiff > 0) {
            /* left swipe */
            setGoToSlide(goToSlide + 1);
        } else {
            /* right swipe */
            setGoToSlide(goToSlide - 1);
        }
        } else {
        if (yDiff > 0) {
            /* up swipe */
        } else {
            /* down swipe */
        }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    };
    
    return (
        <div
            className="Carousel"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
            <Carousel
                slides={cards}
                goToSlide={goToSlide}
                goToSlideDelay={100}
                offsetRadius={offsetRadius}
                showNavigation={false}
                animationConfig={config.gentle}
            />
        </div>
    )
}
