import {useMap} from 'react-leaflet';
import * as L from 'leaflet';
import { distanceTwoPoints } from './coordsFromMap';


const GPXTrack = (props) => {
    const parsedGeoJSon = JSON.parse(props.geoJsonFile)    
    const map = useMap();
    new L.geoJSON(parsedGeoJSon, {
        style: {color: "#E9B00D"}
        }
    ).addTo(map);
    
    map.on('click', function(e) {
        if(props.addNewReferencePoint){
            // console.log(e.latlng.lat, e.latlng.lng);
            // We find the closest coordinates on the track corresponding to the
            let minDistance = Math.pow(10,1000); //Infinity
            let closestPointOnTrack = null;
            parsedGeoJSon.features[0].geometry.coordinates.forEach((coords) => {
                // Coords are inverted in geoJson : [long, lat] instead of [lat, long]
                if(minDistance > distanceTwoPoints([e.latlng.lat, e.latlng.lng], [coords[1], coords[0]])){
                    // console.log(coords);
                    minDistance = distanceTwoPoints([e.latlng.lat, e.latlng.lng], [coords[1], coords[0]]);
                    closestPointOnTrack = [coords[1], coords[0]];
                }
            });
                
            if(closestPointOnTrack !== null){
                console.log(closestPointOnTrack);
                props.setNewReferencePointCoords(closestPointOnTrack);
            }
        }
    });
}

export default GPXTrack;