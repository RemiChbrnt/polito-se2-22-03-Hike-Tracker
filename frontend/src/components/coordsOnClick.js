import {useMap} from 'react-leaflet';
import * as L from 'leaflet';


const CoordsOnClick = ({setCoords}) => {    
    const map = useMap();
    map.on('click', function(e) {
        console.log(e.latlng.lat, e.latlng.lng);
        setCoords([[e.latlng.lat, e.latlng.lng]])
    });
}

export {CoordsOnClick};