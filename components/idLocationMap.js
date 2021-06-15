import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons"

import GoogleMapReact from 'google-map-react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
//TO-DO: Hide API key in env variables
export default function IdLocationMap (props) {
  let {searchLocation, onMapClick} = props;
  searchLocation ? null : searchLocation = {longitude: -78.92876857, latitude: 36.01385727};

  const apiIsLoaded = (map, maps) => {
    map.setOptions({'fullscreenControl': false});
  }

  //const searchLocation = [-78.92876857, 36.01385727];
  return (
    <div style={{ height: '90vh', width: '100%', position: 'relative'}}>
      <GoogleMapReact 
        bootstrapURLKeys={{key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}}
        defaultCenter={{lng: searchLocation.longitude, lat: searchLocation.latitude}}
        defaultZoom={15}
        onClick={onMapClick}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}>
        {props.children}
      </GoogleMapReact>
      <div style={{position: 'absolute', top: '3%', left: '1%'}}>
        <Link href="/explore"><Button variant="light"><FontAwesomeIcon icon={faAngleDoubleLeft} size='2x'/></Button></Link>
      </div>
    </div>
  )
}