import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import GoogleMapReact from 'google-map-react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

export default function IdLocationMap(props) {
  let { searchLocation, onMapClick } = props;
  // Set default location if geolocation fails or is not allowed
  if (!searchLocation) {
    searchLocation = { longitude: -78.92876857, latitude: 36.01385727 };
  }
  // searchLocation
  //   ? null
  //   : ();

  const apiIsLoaded = (map, maps) => {
    map.setOptions({ fullscreenControl: false });
  };

  // const searchLocation = [-78.92876857, 36.01385727];
  return (
    <div style={{ height: '80vh', width: '100%', position: 'relative' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{
          lng: searchLocation.longitude,
          lat: searchLocation.latitude,
        }}
        defaultZoom={15}
        onClick={onMapClick}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
      >
        {props.children}
      </GoogleMapReact>
    </div>
  );
}
