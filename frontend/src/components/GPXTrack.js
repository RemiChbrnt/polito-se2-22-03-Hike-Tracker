import {useState} from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet';
import * as L from 'leaflet';
import toGeoJson from '@mapbox/togeojson'
import { DOMParser } from 'xmldom'

const GPXTrack = (props) => {

    console.log(props);
    
    const map = useMap();
    if (props.file != undefined){
        if (props.file != null){
            console.log(props.file.file);
            let reader = new FileReader();
            reader.readAsText(props.file.file);
            reader.onloadend =() => {
                var gpx = new DOMParser().parseFromString(reader.result);
                var converted = toGeoJson.gpx(gpx);
                new L.geoJSON(converted).addTo(map);
            
            }
        }
    }
    return (null);
}

export default GPXTrack;