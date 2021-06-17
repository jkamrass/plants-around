import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button } from "react-bootstrap";
import CurrentLocationMapMarker from "../currentLocationMapMarker";
import IdLocationMap from "../idLocationMap";

const IdLocationSection = ({geoLocation, setGeoLocation, geoId}) => {
  const [showMap, setShowMap] = useState(false);
  const onMapClick = ({x, y, lng, lat, event}) => {
    setGeoLocation({longitude: lng, latitude: lat})
  }
  if (showMap) {
    console.log('Clear watch called');
    navigator.geolocation.clearWatch(geoId);
  }

  return (
    <div className="row mb-3">
      <div className="col-md-12">
        <h4>Location</h4>
        <Button variant="outline-primary" onClick={() => setShowMap(true)}><FontAwesomeIcon icon={faMapMarkerAlt} /></Button>
        {showMap ? <IdLocationMap searchLocation={geoLocation} onMapClick={onMapClick}><CurrentLocationMapMarker lng={geoLocation.longitude} lat={geoLocation.latitude}/></IdLocationMap> : null}
      </div>
    </div>
  )
}

export default IdLocationSection