import {useState} from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet';
import * as L from 'leaflet';

const Map = (props) => {
    const startPosition = [45.079300, 7.675558];
    const finishPosition = [45.056300, 7.715558];
    const [windowSize, setWindowSize] = useState(getWindowSize());
    
    function getWindowSize() {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
      }

    const startIcon = new L.Icon({
        iconUrl: require('../images/start-marker.png'),
        iconSize: [104, 158]
    });
    const finishIcon = new L.Icon({
        iconUrl: require('../images/finish-marker.png'),
        iconSize: [104, 158]
    });
    return (
        <MapContainer center={props.startPt} zoom={12} scrollWheelZoom={false} style={{width: windowSize.innerWidth/2.5, height: windowSize.innerHeight/1.5}} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                    <Marker position={props.startPt} icon={startIcon}>
                        <Popup>
                            Starting point<br />
                        </Popup>
                    </Marker>
                    <Marker position={props.endPt} icon={finishIcon}>
                        <Popup>
                            Finish point<br />
                        </Popup>
                    </Marker>
        </MapContainer>
    );
}

export default Map;