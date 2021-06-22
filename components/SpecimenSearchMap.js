import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons"

import GoogleMapReact from 'google-map-react';
import { Button, Card, Image } from 'react-bootstrap';
import Link from 'next/link';
//TO-DO: Hide API key in env variables
export default function SpecimenSearchMap (props) {
  let {searchLocation, speciesInfo} = props;
  searchLocation ? null : searchLocation = {longitude: -78.92876857, latitude: 36.01385727};

  const apiIsLoaded = (map, maps) => {
    map.setOptions({'fullscreenControl': false});
  }

  const onMapClick = ({ x, y, lat, lng, event }) => {
    console.log(event);
  }
  //const searchLocation = [-78.92876857, 36.01385727];
  return (
    <div style={{ height: '90vh', width: '100%', position: 'relative'}}>
      <GoogleMapReact 
        bootstrapURLKeys={{key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}}
        defaultCenter={{lng: searchLocation.longitude, lat: searchLocation.latitude}}
        defaultZoom={15}
        onClick={onMapClick}
        onChange={(mapState) => console.log(mapState)}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}>
        {props.children}
      </GoogleMapReact>
      <div className="shadow" style={{position: 'absolute', top: '3%', left: '1%'}}>
        <Link href="/explore"><Button variant="light"><FontAwesomeIcon icon={faAngleDoubleLeft} size='2x'/></Button></Link>
      </div>
      <div style={{position: 'absolute', top: '3%', right: '1%', width: '10%', minWidth: '100px'}}>
        {speciesInfo ? (
          <div className="card shadow">
            <img src={speciesInfo.images.thumbnail} className="card-img-top" alt="..."></img>
            <div className="card-body p-0">
              <h6 className="card-title">{speciesInfo.name}</h6>
            </div>
          </div>
          ) : <p>Loading...</p>
        }
      </div>
    </div>
  )
}