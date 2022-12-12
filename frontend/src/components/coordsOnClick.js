import {useState} from 'react';
import {useMap} from 'react-leaflet';

// If radius is not nil, then we display a circle on the map of specific radius (in meters)
const CoordsOnClick = ({setCoords, setLocalCoords}) => {    
    const map = useMap();

    map.on('click', function(e) {
        // console.log(e.latlng.lat, e.latlng.lng);
        setCoords([e.latlng.lat, e.latlng.lng]);
        setLocalCoords([[e.latlng.lat, e.latlng.lng]]);
    });
}

export {CoordsOnClick};