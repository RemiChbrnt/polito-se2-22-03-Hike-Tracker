import { useState } from "react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { CoordsOnClick } from "./coordsOnClick";
const SelectCoordinatesFromMap = (props) => {
    const [coords, setCoords]= useState([]);

    return (
        <MapContainer center={props.center} zoom={11} scrollWheelZoom={false} style={{width: 500, height: 500}} >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
                {coords.map((latlong, index) => 
                    <Marker key={index} position={latlong} >
        
                    </Marker>
                )}
                <CoordsOnClick setCoords={setCoords}/>
        </MapContainer>
    );
}

export { SelectCoordinatesFromMap };