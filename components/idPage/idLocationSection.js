import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import CurrentLocationMapMarker from "../currentLocationMapMarker";
import IdLocationMap from "../idLocationMap";

const IdLocationSection = ({geoLocation, setGeoLocation, geoId}) => {
  const [showMap, setShowMap] = useState(false);
  const handleClose = () => setShowMap(false);
  const handleShow = () => setShowMap(true);
  const onMapClick = ({x, y, lng, lat, event}) => {
    setGeoLocation({longitude: lng, latitude: lat})
  }
  if (showMap) {
    console.log('Clear watch called');
    navigator.geolocation.clearWatch(geoId);
  }

  return (
    <>
      <div className="row mb-3">
        <div className="col-md-12">
          <h4>Location</h4>
          <Button variant="outline-primary" onClick={handleShow}><FontAwesomeIcon icon={faMapMarkerAlt} /></Button>
          {/* {showMap ? <IdLocationMap searchLocation={geoLocation} onMapClick={onMapClick}><CurrentLocationMapMarker lng={geoLocation.longitude} lat={geoLocation.latitude}/></IdLocationMap> : null} */}
        </div>
      </div>
      <Modal show={showMap} onHide={handleClose} backdropClassName="map-modal-dimensions">
        <Modal.Body>{showMap ? <IdLocationMap searchLocation={geoLocation} onMapClick={onMapClick}><CurrentLocationMapMarker lng={geoLocation.longitude} lat={geoLocation.latitude}/></IdLocationMap> : null}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Set Location
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default IdLocationSection