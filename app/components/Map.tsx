'use client';

import L from "leaflet";
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    // iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
    iconUrl: markerIcon.src,
    // iconRetinaUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon-2x.png',
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});


interface MapProps {
    center?: number[]
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const Map: React.FC<MapProps> = ({ center }) => {
    return (
        <MapContainer
            center={center as L.LatLngExpression || [51, -0.09]}
            zoom={center ? 4 : 2}
            scrollWheelZoom={false}
            className="h-[35vh] rounded-lg"
        >
            <TileLayer
                url={url}
                attribution={attribution}
            />
            {center && (
                <Marker position={center as L.LatLngExpression} />
            )}
        </MapContainer>
    )
}

export default Map;