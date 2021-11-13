import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
  iconUrl: require("leaflet/dist/images/marker-icon.png").default,
  shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
});

function Map() {
  let position = [30.79687513411045, 31.421163140657065];
  let [markerPositions, setMarkerPositions] = React.useState([]);
  React.useEffect(() => {
    axios({
      method: "GET",
      url: "/shops/",
    })
      .then((response) => {
        setMarkerPositions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setMarkerPositions, markerPositions]);

  return (
    <div id="map" style={{ height: "700px" }}>
      <pre>
        <code>
          {markerPositions && JSON.stringify(markerPositions, null, 4)}
        </code>
      </pre>

      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
