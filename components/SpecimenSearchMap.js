import GoogleMapReact from 'google-map-react';
//TO-DO: Hide API key in env variables
export default function SpecimenSearchMap (props) {
  let {searchLocation} = props;
  searchLocation ? null : searchLocation = {longitude: -78.92876857, latitude: 36.01385727};

  const apiIsLoaded = (map, maps) => {
    map.setOptions({'fullscreenControl': false});
    debugger;
  }
  //const searchLocation = [-78.92876857, 36.01385727];
  return (
    <div style={{ height: '90vh', width: '100%', position: 'relative'}}>
      <GoogleMapReact 
        bootstrapURLKeys={{key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}}
        defaultCenter={{lng: searchLocation.longitude, lat: searchLocation.latitude}}
        defaultZoom={15}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}>
        {props.children}
      </GoogleMapReact>
      <div style={{position: 'absolute', top: '5%'}}>
        <p>test</p>
      </div>
    </div>
  )
}