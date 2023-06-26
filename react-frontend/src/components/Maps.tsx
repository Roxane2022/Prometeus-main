import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { map, popup } from "leaflet";
import placeholder from "./placeholder.png";

  var icon = L.icon({
  iconUrl:placeholder,
  iconSize: [38, 38],
});  
 



const position = [51.505, -0.09];

function ResetCenterView(props: { selectPosition: any; }) {
  const { selectPosition } = props!;
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition?.lat, selectPosition?.lon),
        8,//map.getZoom(),
        {
          animate: true
        }
      )
    }
  }, [selectPosition]);

  return null;
}

export default function Maps(props: { selectPosition: any; }) {
   const { selectPosition } = props;
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];
 
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={8}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=1xj8wNzR9WMVcM7rnvSx"
      />
      {selectPosition && (
        <Marker position={[51.505, -0.09]}
         icon={icon} >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
      


      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
}
