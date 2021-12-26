import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from "react-spring-3d-carousel";
import { config } from "react-spring";
import { Cards } from '../components/ProjectList';
import { ReactComponent as GithubIcon } from '../Assets/github.svg';
import { ReactComponent as OpenIcon } from '../Assets/open.svg';
import { ReactComponent as CodepenIcon } from '../Assets/codepen.svg';

import './Portfolio.css';

const Card = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    background: #252525;
    border-radius: 8px 8px 4px 4px;
    z-index: 11;
    text-align: center;
    overflow: hidden;
    transition: transform .2s linear;
    &:hover {
        transform: scale(102%);
    }
    @media (max-width: 380px) {
            width: 330px;
    }
`;

const CardImg = styled.div`
@media (max-width: 380px) {
        width: 330px;
}
`;

const Img = styled.img`
object-fit: contain;
display: block;
width: 100%;
@media (max-width: 380px) {
        width: 330px;
}
`;

const ButtonsContainer = styled.div`
    border-radius: 0 2px 8px 0;
    position: fixed;
    display: grid;
    gap: 10px;
    padding: 5px;
    background: #20202060;
    backdrop-filter: blur(1px);
`;

const Text = styled.div`
    padding: 0 20px;
    heigth: fit-content;
`;


export default function Porfolio() {
    const [goToSlide, setGoToSlide] = useState(0);
    const slides = [...Cards].map((card, i) => ({
        key: card.title,
        content: <Card key={card.title} >
                        <CardImg>
                            <ButtonsContainer>
                                <a href={card.demoLink} target="blank"><OpenIcon/></a>
                                { card.githubLink.length > 0 &&
                                    <a href={card.githubLink} target="blank"><GithubIcon/></a> }
                                { card.codepenLink.length > 0 &&
                                    <a href={card.codepenLink} target="blank"><CodepenIcon/></a> }
                            </ButtonsContainer>
                            <Img src={card.src} alt="1" />
                        </CardImg>
                        { i === goToSlide &&
                        <Text>
                            <h2>{card.title}</h2>
                            <h4>{card.details}</h4>
                        </Text>}
                 </Card>, 
    }));

    const table = slides.map((element, i) => {
        return { ...element, onClick: () => {setGoToSlide(i) }};
    });
    
    let xDown = null;
    let yDown = null;

    const getTouches = (e) => {
        return (
        e.touches || e.originalEvent.touches // browser API
        ); // jQuery
    };

    useEffect(() => {
        console.log(Math.abs(goToSlide));
        

    }, [goToSlide, slides])

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
            goToSlide === 0 ? setGoToSlide(slides.length-1) : setGoToSlide(goToSlide - 1);
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
                slides={table}
                goToSlide={goToSlide}
                goToSlideDelay={200}
                offsetRadius={2}
                showNavigation={false}
                animationConfig={config.gentle}
            />
        </div>
    )
}
