import {useState} from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet';
import * as L from 'leaflet';
import GPXTrack from "./GPXTrack";
import { HikeGrid } from "./hikeList";

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

    const center={
        latitude: (endPt.latitude + startPt.latitude)/2,
        longitude: (endPt.longitude + startPt.longitude)/2
    }
   
    return (
        <MapContainer center={[center.latitude, center.longitude]} zoom={13} scrollWheelZoom={false} style={{width: windowSize.innerWidth/1.5, height: windowSize.innerHeight/2.5}} >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
                <Marker position={[startPt.latitude, startPt.longitude]} icon={startIcon}>
                    <Popup>
                        Starting point<br />
                        {(startPt.address !== null)&&startPt.address}
                    </Popup>
                </Marker>
                <Marker position={[endPt.latitude, endPt.longitude]} icon={finishIcon}>
                    <Popup>
                        Arrival point<br />
                        {(endPt.address !== null)&&endPt.address}
                    </Popup>
                </Marker>
                {(props.file !== undefined) && <GPXTrack geoJsonFile={props.file}/>}
        </MapContainer>
    );
}

export default Map;