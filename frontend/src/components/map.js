import {useState} from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet';
import * as L from 'leaflet';

const Map = (props) => {
    const startPt = JSON.parse(props.startPt);
    const endPt = JSON.parse(props.endPt);
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
        <MapContainer center={[startPt.latitude, startPt.longitude]} zoom={12} scrollWheelZoom={false} style={{width: windowSize.innerWidth/2.5, height: windowSize.innerHeight/1.5}} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                    <Marker position={[startPt.latitude, startPt.longitude]} icon={startIcon}>
                        <Popup>
                            Starting point<br />
                        </Popup>
                    </Marker>
                    <Marker position={[endPt.latitude, endPt.longitude]} icon={finishIcon}>
                        <Popup>
                            Finish point<br />
                        </Popup>
                    </Marker>
        </MapContainer>
    );
}

export default Map;