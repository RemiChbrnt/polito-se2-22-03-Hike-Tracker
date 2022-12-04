import { useState } from "react";
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import { CoordsOnClick } from "./coordsOnClick";

/**
 * Component to get coordinates from selection on the map
 * @param {*} center: the map's display center coordinate
 * @param radius: if =0 or undefined, display markers, otherwise display a center of radius "radius"
 * @param {*} coords: the parent useState variable for storing the coordinates
 * @param {*} setCoords: the parent useState set function for the desired coordinates (given on a user click)
 * @returns Map component with possibility to obtain the coordinates from user click
 */
const CoordsFromMap = ({center, radius = 0, setCoords}) => {

    const [localCoords, setLocalCoords] = useState([]);

    return (
        <MapContainer center={center} zoom={11} scrollWheelZoom={false} style={{width: 500, height: 500}} >
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

export { CoordsFromMap };