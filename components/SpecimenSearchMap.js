import GoogleMapReact from 'google-map-react';
//TO-DO: Hide API key in env variables
export default function SpecimenSearchMap () {
  
  //const searchLocation = [-78.92876857, 36.01385727];
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact 
        bootstrapURLKeys={{key: "AIzaSyD5K5fJO3asvidTRdf85iVDGtodw0dp5fk"}}
        defaultCenter={{lng: -78.92876857, lat: 36.01385727}}
        defaultZoom={11}>
      </GoogleMapReact>
    </div>
  )
}