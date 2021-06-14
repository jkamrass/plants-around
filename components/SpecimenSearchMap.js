import GoogleMapReact from 'google-map-react';
//TO-DO: Hide API key in env variables
export default function SpecimenSearchMap (props) {
  let {searchLocation} = props;
  searchLocation ? null : searchLocation = {longitude: -78.92876857, latitude: 36.01385727};
  //const searchLocation = [-78.92876857, 36.01385727];
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact 
        bootstrapURLKeys={{key: process.env.GOOGLE_MAPS_API_KEY}}
        defaultCenter={{lng: searchLocation.longitude, lat: searchLocation.latitude}}
        defaultZoom={15}>
        {props.children}
      </GoogleMapReact>
    </div>
  )
}