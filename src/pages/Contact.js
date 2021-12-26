import React from 'react';
import { Map, Marker } from "pigeon-maps";
import './Contact.scss';

export default function Contact() {

    return (
        <ul className="contact">
            <li className="li1" key="phone">
                <h4>Phone:</h4>
                <a href="tel:972509040652">050-9040652</a>
            </li>
            <li className="li2" key="email">
                <h4>Mail:</h4>
                <a href="mailto:elna.nitz@gmail.com">elna.nitz@gmail.com</a>
            </li>
            <li className="li3" key="adress">
                <h4>Adress:</h4>
                <div>31 Harel, Yad Binyamin, Isrel</div>
                <div className="map">
                    <Map height={250} defaultCenter={[31.798810495510097, 34.81891701781926]} defaultZoom={10}>
                        <Marker width={50} anchor={[31.798810495510097, 34.81891701781926]} />
                    </Map>
                </div>
            </li>
        </ul>
    )
}
