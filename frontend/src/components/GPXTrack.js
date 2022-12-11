import {useMap} from 'react-leaflet';
import * as L from 'leaflet';


const GPXTrack = (props) => {    
    const map = useMap();
    new L.geoJSON(JSON.parse(props.geoJsonFile), {
        style: {color: "#E9B00D"}
        }
    ).addTo(map);
}

export default GPXTrack;