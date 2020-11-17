import React, { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

export default function Map ({ scooters, position, center }) {
  const [zoom] = useState(14)

  const renderScooterMarkers = () => {
    return scooters.map((scooter, index) => {
    return (<Marker 
        position={scooter.coords}
        key={index}
        >
      <Popup>
        <div>
          <p>{scooter.name} - {scooter.priority}</p>
          <p>{scooter.issue}</p>
          <p>{scooter.note}</p>
          <p>{scooter.location}</p>
        </div>
      </Popup>
    </Marker>)
    })
  }
  console.log(center)
  
  return (
    <section className="map-container">
      <div className="map">
        {position && 
          <MapContainer center={center} zoom={zoom}
            style={{ height: "100%", width: "100%" }}
            >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <Marker position={position}>
            <Popup>
              <div className="popup">
                {/* <h4 id="current-address">{address.street}, {address.city}, {address.state} {address.zip}</h4> */}
                <span>You are Here!</span>
              </div>
            </Popup>
          </Marker>

          {renderScooterMarkers()}
        </MapContainer>
        }
      </div>

    </section>
    
  )
}