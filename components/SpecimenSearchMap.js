import GoogleMapReact from 'google-map-react';
//TO-DO: Hide API key in env variables
export default function SpecimenSearchMap ({searchLocation}) {
  searchLocation ? null : searchLocation = {longitude: -78.92876857, latitude: 36.01385727};
  //const searchLocation = [-78.92876857, 36.01385727];
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact 
        bootstrapURLKeys={{key: "AIzaSyD5K5fJO3asvidTRdf85iVDGtodw0dp5fk"}}
        defaultCenter={{lng: searchLocation.longitude, lat: searchLocation.latitude}}
        defaultZoom={15}>
      </GoogleMapReact>
    </div>
  )
}