import React from 'react';
import './Home.css';
import { ReactComponent as GithubIcon } from '../Assets/github.svg';
import { ReactComponent as CodepenIcon } from '../Assets/codepen.svg';
import { ReactComponent as FacebookIcon } from '../Assets/facebook.svg';
import { ReactComponent as LinkedInIcon } from '../Assets/linkedin.svg';

export default function Home() {

    return (
        <div className="home-container">
            <div className="home-wrapper">
                <div className="text-container">
                    <h1 className="line-1 anim-typewriter">
                        Hi, I am Elnatan Nitzan,
                    </h1>
                    <br/>
                    <h3 className="line-1">
                        I am Front-End junior developer.
                        Recently I studied client side
                        development technologies,
                        especially Angular and ReactJS.
                        I can provide clean code
                        and pixel perfect design.
                    </h3>
                </div>
                <div className="buttons">
                    <a href="https://github.com/elnatanitzan" target="blank"><GithubIcon/></a>
                    <a href="https://codepen.io/elnatanitzan" target="blank"><CodepenIcon/></a>
                    <a href="https://www.facebook.com/profile.php?id=100021684150138" target="blank"><FacebookIcon/></a>
                    <a href="https://www.linkedin.com/in/elnatanitzan/" target="blank"><LinkedInIcon/></a>
                </div>
            </div>
        </div>
    );
};
