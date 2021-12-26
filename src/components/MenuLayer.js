import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

import {
    staggerText,
    staggerReveal,
    fadeInUp,
    handleImageReturn,
    handleImage,
    staggerRevealClose
  } from "./Animations";

import ApiExplorer from "../project-photos/Angular-Api-explorer.png";
import CookBook from "../project-photos/Cook-Book-Hooks-Api-Server.png";
import ReactMemoryGame from "../project-photos/React-Memory-Game.png";
import TodoAppReactFirebase from "../project-photos/TodoApp-React-Firebase.png";
import SetButtonsSASS from "../project-photos/set-Buttons-use-SASS-@mixin.png";


const images = [
  { name: "Api-Explorer", image: ApiExplorer },
  { name: "CookBook", image: CookBook },
  { name: "MemoryGame", image: ReactMemoryGame },
  { name: "TodoApp", image: TodoAppReactFirebase },
  { name: "SetButtons", image: SetButtonsSASS }
];

const MenuLayer = ({ initial, clicked }) => {
    // Create varibles of our dom nodes
    let menuLayer = useRef(null);
    let reveal1 = useRef(null);
    let reveal2 = useRef(null);
    let imageBackground = useRef(null);
    let line1 = useRef(null);
    let line2 = useRef(null);
    let line3 = useRef(null);
    let info = useRef(null);

    useEffect(() => {
        // If the menu is open and we click the menu button to close it.
        if (clicked === false) {
          // If menu is closed and we want to open it.
    
          staggerRevealClose(reveal2, reveal1);
          // Set menu to display none
          gsap.to(menuLayer, { duration: 1, css: { display: "none" } });
        } else if (
          clicked === true ||
          (clicked === true && initial === null)
        ) {
          // Set menu to display block
          gsap.to(menuLayer, { duration: 0, css: { display: "block" } });
          //Allow menu to have height of 100%
          gsap.to([reveal1, reveal2], {
            duration: 0,
            opacity: 1,
            height: "100%"
          });
          staggerReveal(reveal1, reveal2);
          fadeInUp(info);
          staggerText(line1, line2, line3);
        }
      }, [initial, clicked]);

      return (
        <div ref={el => (menuLayer = el)} className='hamburger-menu'>
          <div
            ref={el => (reveal1 = el)}
            className='menu-secondary-background-color'>
          </div>
          <div ref={el => (reveal2 = el)} className='menu-layer'>
            <div
              ref={el => (imageBackground = el)}
              className='menu-image-background'>
            </div>
            <div className='container'>
              <div className='wrapper'>
                <div className='menu-links'>
                  <nav>
                    <ul>
                      <li>
                        <Link
                          ref={el => (line1 = el)}
                          to='/about'>
                          About
                        </Link>
                      </li>
                      <li>
                        <Link
                          ref={el => (line2 = el)}
                          to='/portfolio'>
                          Porfolio
                        </Link>
                      </li>
                      <li>
                        <Link
                          ref={el => (line3 = el)}
                          to='/contact'>
                          Contact
                        </Link>
                      </li>
                    </ul>
                  </nav>
                  <div ref={el => (info = el)} className='info'>
                    
                  </div>
                  <div className='projects'>
                    <span>Projects:</span>
                    {/* Returning the list of images */}
                    {images.map(el => (
                      <span
                        className="menu-images"
                        key={el.name}
                        onMouseEnter={() => handleImage(el.image, imageBackground)}
                        onMouseOut={() => handleImageReturn(imageBackground)}>
                        {el.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
};

export default MenuLayer;