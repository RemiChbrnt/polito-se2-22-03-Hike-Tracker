import { useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import * as L from 'leaflet';
import GPXTrack from "./GPXTrack";

const Map = (props) => {
    const startPt = JSON.parse(props.startPt);
    const endPt = JSON.parse(props.endPt);
    const referencePoints = JSON.parse(props.referencePoints);
    const [windowSize, _] = useState(getWindowSize());

    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

    const hutIcon = new L.Icon({
        iconUrl: require('../images/hut-marker.png'),
        iconSize: [104, 158]
    });
    const parkinglotIcon = new L.Icon({
        iconUrl: require('../images/parkinglot-marker.png'),
        iconSize: [104, 158]
    });
    const defaultMarker = new L.Icon({
        iconUrl: require('../images/pin-marker.png'),
        iconSize: [104, 158]
    });

    const startIcon = new L.Icon({
        iconUrl: require('../images/start-marker.png'),
        iconSize: [104, 158]
    });
    const finishIcon = new L.Icon({
        iconUrl: require('../images/finish-marker.png'),
        iconSize: [104, 158]
    });

    const center = {longitude: 7.6625, latitude: 45.07031} 

    return (
        <MapContainer id='map' center={[center.latitude, center.longitude]} zoom={13} scrollWheelZoom={false} style={{ minWidth: windowSize.innerWidth / 1.8, minHeight: windowSize.innerHeight / 1.5 }} >
            {/* <MapContainer center={[center.latitude, center.longitude]} zoom={13} scrollWheelZoom={false} style={{ width: "calc(100%)", height: "calc(100%)" }}> */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
                {referencePoints.map(refPt => {
                        if((props.displayPoints[0] && refPt.type==="parkinglot") || 
                        (props.displayPoints[1] && refPt.type==="hut") || 
                        (props.displayPoints[2] && refPt.type==="generic")){
                            return (<Marker 
                                key={refPt.id}
                                position={[refPt.latitude, refPt.longitude]} 
                                icon={(refPt.type==="hut")? hutIcon : (refPt.type==="parkinglot")? parkinglotIcon : defaultMarker}>
                                <Popup>
                                    {refPt.name}<br />
                                    {(refPt.address !== null)&&refPt.address}
                                </Popup>
                            </Marker>);
                        }
                    }
                )}
                {(props.newReferencePointCoords !== null) && props.addNewReferencePoint &&
                    <Marker 
                    position={props.newReferencePointCoords} 
                    icon={defaultMarker}>
                    </Marker>
                }
                {props.displayPoints[3] &&
                    <Marker position={[startPt.latitude, startPt.longitude]} icon={startIcon}>
                        <Popup>
                            Starting point<br />
                            {(startPt.address !== null)&&startPt.address}
                        </Popup>
                    </Marker>
                }
                {props.displayPoints[3] &&
                    <Marker position={[endPt.latitude, endPt.longitude]} icon={finishIcon}>
                        <Popup>
                            Arrival point<br />
                            {(endPt.address !== null)&&endPt.address}
                        </Popup>
                    </Marker>
                }
                {(props.file !== undefined && props.file !== null) && <GPXTrack 
                    geoJsonFile={props.file} 
                    setNewReferencePointCoords={props.setNewReferencePointCoords}
                 />}
        </MapContainer>
    );
}

export default Map;