import {useState, useEffect} from "react";
import { Col, Container, Row, Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet';
import * as L from 'leaflet';

const Map = () => {
    const startPosition = [45.079300, 7.675558];
    const finishPosition = [45.056300, 7.715558];

    const startIcon = new L.Icon({
        iconUrl: require('../images/start-marker.png'),
        iconSize: [104, 158]
    });
    const finishIcon = new L.Icon({
        iconUrl: require('../images/finish-marker.png'),
        iconSize: [104, 158]
    });
    return (
        <MapContainer center={startPosition} zoom={12} scrollWheelZoom={false} style={{width: 500, height: 400}} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                    <Marker position={startPosition} icon={startIcon}>
                        <Popup>
                            Starting<br /> Easily customizable.
                        </Popup>
                    </Marker>
                    <Marker position={finishPosition} icon={finishIcon}>
                        <Popup>
                            Starting<br /> Easily customizable.
                        </Popup>
                    </Marker>
        </MapContainer>
    );
}

export default Map;