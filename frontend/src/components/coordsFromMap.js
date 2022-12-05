import { useState } from "react";
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import { CoordsOnClick } from "./coordsOnClick";
import * as L from 'leaflet';

/**
 * Component to get coordinates from selection on the map
 * @param {*} center: the map's display center coordinate
 * @param radius: if =0 or undefined, display markers, otherwise display a center of radius "radius"
 * @param {*} coords: the parent useState variable for storing the coordinates
 * @param {*} setCoords: the parent useState set function for the desired coordinates (given on a user click)
 * @returns Map component with possibility to obtain the coordinates from user click
 */
const CoordsFromMap = ({center, radius = 0, setCoords}) => {

    const [localCoords, setLocalCoords] = useState([center]);

    return (
        <MapContainer center={center} zoom={11} scrollWheelZoom={false} style={{width: 650, height: 400}} >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
                <CoordsOnClick setCoords={setCoords} setLocalCoords={setLocalCoords}/>
                {(radius === 0)?
                    localCoords.map((point, index) =>
                        <Marker key={index} position={point}/>
                    )
                :
                    localCoords.map((point, index) =>
                        <Circle key={index} center={point} radius={radius} color="darkGreen" opacity={0.7}/>
                    )
                }
        </MapContainer>
    );
}

/**
 * Function to verify a point lies within a circle
 * @param {*} pointCoords: point coordinates to be checked
 * @param {*} diskCenter: center point coordinates for the disk
 * @param {*} diskRadius: radius for the disk to be checked
 * @returns true if point in disk, false if not, error if parameters are incorrect
 */
const isPointInDisk = (pointCoords, diskCenter, diskRadius ) => {
    if (Array.isArray(pointCoords) && Array.isArray(diskCenter)) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(diskCenter[0]-pointCoords[0]);  // deg2rad below
        var dLon = deg2rad(diskCenter[1]-pointCoords[1]); 
        var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(diskCenter[0])) * Math.cos(deg2rad(pointCoords[0])) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        if (d < diskRadius){
            return true;
        }
        return false;
    } else {
        throw new Error("Inconsistent parameters, try reading doc in coordsFromMap.js");
    }
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

export { CoordsFromMap, isPointInDisk };