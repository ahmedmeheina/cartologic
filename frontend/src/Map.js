import React, { useState, useEffect } from "react";
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
  const [markers, setMarkers] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsDataLoaded(true);
      const result = await axios("/shops/");

      setMarkers(result.data);

      setTimeout(() => {
        setIsDataLoaded(false);
      }, 2000);
    };

    fetchData();
  }, [setMarkers]);

  return (
    <React.Fragment>
      {isDataLoaded ? (
        <p>Loading ...</p>
      ) : (
        <div id="map" style={{ height: "700px" }}>
          <MapContainer
            center={getPoint(markers[0])}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((item, index) => (
              <Marker position={getPoint(item)} key={index}>
                <Popup>
                  {item.title} <br /> {item.description}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </React.Fragment>
  );
}

function getPoint(pointString) {
  console.log(pointString);
  let point = [50, 50];
  if (pointString && pointString.location) {
    const regExp = /\(([^)]+)\)/;
    point = regExp.exec(pointString.location)[1].split(" ");
  }
  return point;
}

export default Map;
