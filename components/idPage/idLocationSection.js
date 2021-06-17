import { faCheck, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import CurrentLocationMapMarker from "../currentLocationMapMarker";
import IdLocationMap from "../idLocationMap";

const IdLocationSection = ({locationOfId, setLocationOfId}) => {
  const locationWatchId = useRef(null);
  const [geoLocation, setGeoLocation] = useState(null);
  const [geoLocationAccuracy, setGeoLocationAccuracy] = useState(null);
  const [geoLocationError, setGeoLocationError] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [centerOfMap, setCenterOfMap] = useState();
  const [mapMarkerLocation, setMapMarkerLocation] = useState();

  useEffect(() => {
    locationWatchId.current = navigator.geolocation.watchPosition(onLocationUpdate, onFailedGeolocation, {enableHighAccuracy: true});
    return cancelLocationWatch;
  }, [])

  const onLocationUpdate = (position) => {
    console.log(position.coords.accuracy);
    if (!geoLocationAccuracy || position.coords.accuracy < geoLocationAccuracy) {
      setGeoLocation({longitude: position.coords.longitude, latitude: position.coords.latitude});
      setGeoLocationAccuracy(position.coords.accuracy);
    }
  };

  const onFailedGeolocation = (error) => {
    setGeoLocationError(error.message);
  };

  const cancelLocationWatch = () => {
    if (locationWatchId.current && navigator.geolocation) {
      console.log('clear watch called');
      navigator.geolocation.clearWatch(locationWatchId.current);
    }
  };

  const handleClose = () => setShowMap(false);
  const handleShow = () => {
    cancelLocationWatch();
    setCenterOfMap(locationOfId || geoLocation);
    setMapMarkerLocation(locationOfId || geoLocation);
    setShowMap(true);
  }
  const onMapClick = ({x, y, lng, lat, event}) => {
    setMapMarkerLocation({longitude: lng, latitude: lat});
    // setGeoLocation({longitude: lng, latitude: lat})
  }
  const handleSetLocationClick = () => {
    setLocationOfId(mapMarkerLocation);
    setShowMap(false);
  }

  return (
    <>
      <div className="row mb-3">
        <div className="col-md-12">
          <h4>Location: {locationOfId ? <span><FontAwesomeIcon icon={faCheck} color="green"/></span> : null}</h4>
          <Button variant="outline-primary" onClick={handleShow}><FontAwesomeIcon icon={faMapMarkerAlt} /></Button>
        </div>
      </div>
      <Modal show={showMap} onHide={handleClose} backdropClassName="map-modal-dimensions">
        <Modal.Body>{showMap ? <IdLocationMap searchLocation={centerOfMap} onMapClick={onMapClick}><CurrentLocationMapMarker lng={mapMarkerLocation.longitude} lat={mapMarkerLocation.latitude}/></IdLocationMap> : null}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSetLocationClick}>
            Set Location
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default IdLocationSection