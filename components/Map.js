import React, { useRef, useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './styles.css'

const containerStyle = {
  width: "100%",
  height: "100%"
}

const customIcon = {
  url: './icon-location.svg',
  // size: google.maps.Size(46, 56),
}

const Map = ({ apiKey }) => {
  const refInput = useRef(null);
  const [data, setData] = useState(null);

  const markerPosition = {
    lat: data ? data.latitude : 28.704060,
    lng: data ? data.longitude : 77.102493
  }

  const handleClick = () => {
    fetch(`https://ipapi.co/${refInput.current?.value}/json/`)
    .then((res) => res.json())
    .then((mydata) => {
      if(mydata.error === true){
        alert('Reserved IP Address');
      }else{
        setData(mydata);
      }
    })
  }

  return (
    <>
    <LoadScript googleMapsApiKey={apiKey} 
      onLoad={() => console.log('Maps loaded.')} 
      onError={() => console.error('Maps failed to load.')}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={15}
        center={markerPosition}
      >
        <Marker position={markerPosition} icon={customIcon} />
      </GoogleMap>
    </LoadScript>
    <div className="top-container">
    <div id='SearchBox'>
      <h1>IP Address Tracker</h1>
      <div className="input-container">
        <div className="icon" onClick={handleClick}>
          <img src="./icon-arrow.svg" alt="arrow" />
        </div>
        <input ref={refInput} type="text" placeholder='Search for any Ipaddress or domain' id='searchInput'/>
      </div>
      <div className="details">
        <div className="ipaddress">
          <p>ip address</p>
          <span>{data ? data.ip : "192.212.174.101"}</span>
        </div>
        <div className="location">
          <p>location</p>
          <span>{data ? data.city + ", " + data.region_code + " " + data.postal : "Brooklyn, NY 10001"}</span>
        </div>
        <div className="timezone">
          <p>timezone</p>
          <span>{data ? data.timezone : "UTC -05:00"}</span>
        </div>
        <div className="isp">
          <p>isp</p>
          <span>{data ? data.org : "SpaceX Starlink"}</span>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default Map
