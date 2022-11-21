import {useState} from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet';
import * as L from 'leaflet';
import toGeoJson from '@mapbox/togeojson'
import { DOMParser } from 'xmldom'

const GPXTrack = (props) => {    
    const map = useMap();
    if (props.file != undefined){
        if (props.file != null){
            console.log(props.file.file);
            let reader = new FileReader();
            reader.readAsText(props.file.file);
            reader.onloadend =() => {
                var gpx = new DOMParser().parseFromString(reader.result);
                var converted = toGeoJson.gpx(gpx);
                
                console.log("test");
                console.log(converted);
                // console.log(JSON.stringify(converted));
                var startPointCoordinates = converted.features[0].geometry.coordinates[0];
                var endPointCoordinates = converted.features[0].geometry.coordinates[converted.features[0].geometry.coordinates.length-1];

                console.log(startPointCoordinates);
                console.log(endPointCoordinates);
                new L.geoJSON(converted).addTo(map);
            
            }
        }
    }
    return (null);
}

export default GPXTrack;