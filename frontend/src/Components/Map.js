import React,{useEffect,useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import axios from "axios"


//import "./styles.scss";
export default function Map() {
  const [users ,setUsers] = useState([]) 
  useEffect(() => {
   fetch("http://localhost:5005/map/users").then(res => res.json()).then((users) => setUsers(users));
  },[])

  return (
    //<h>Hello</h
    <MapContainer
      style={{height:"100vh"}}
      center={[0.0, 0.0]}
      zoom={4}
      maxZoom={18}
      minZoom={3}
      attributionControl={false}
    >
      <TileLayer
  url={`https://api.mapbox.com/styles/v1/vakhariaheet/ckkjl9a2n1y8c17oi9cyls7zc/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidmFraGFyaWFoZWV0IiwiYSI6ImNrazZtb3djYjAyZGsyb2xueGNoYzhpZWYifQ.90nZQMoJt7y-bXCyHHCd7Q`}
/>

      <MarkerClusterGroup>
        {users.map((user) => (
          <Marker position={[user.location.coordinates.latitude,user.location.coordinates.longitude]}>
            <Popup>
              <div>
                <img src={user.picture.thumnail} alt="User profile"/>
                <p>{`${user.name.first} ${user.name.last}`}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
