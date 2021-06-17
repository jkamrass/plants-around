import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import ImageUploader from "../../components/imageUploader";
import SpeciesSelectionId from "../../components/speciesSelectionId";
import { Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCamera, faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons"
import Image from "next/image";
import IdLocationMap from "../../components/idLocationMap";
import CurrentLocationMapMarker from "../../components/currentLocationMapMarker";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import IdImageCard from "../../components/idPage/idImageCard";
import IdPicturesSection from "../../components/idPage/idPicturesSection";

function IdPage () {
  const [geoLocation, setGeoLocation] = useState(null);
  const [geoLocationAccuracy, setGeoLocationAccuracy] = useState(null);
  const [geoLocationError, setGeoLocationError] = useState(null);
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [speciesForId, setSpeciesForId] = useState([]);
  const [imagesForId, setImagesForId] = useState([]);
  const [organsInImages, setOrgansInImages] = useState([])
  const [showMap, setShowMap] = useState(false);
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  useEffect(() => {
    // Fetch the possible species to choose from
    axios.get("/api/species")
      .then(response => {
        setSpeciesOptions(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  const onLocationUpdate = (position) => {
    if (!geoLocationAccuracy || position.coords.accuracy < geoLocationAccuracy) {
      setGeoLocation({longitude: position.coords.longitude, latitude: position.coords.latitude});
      setGeoLocationAccuracy(position.coords.accuracy);
    }
  }
  const onMapClick = ({x, y, lng, lat, event}) => {
    setGeoLocation({longitude: lng, latitude: lat})
  }

  useEffect(() => {
    const geoId = navigator.geolocation.watchPosition(onLocationUpdate);
    return () => {
      console.log('Clear watch called');
      navigator.geolocation.clearWatch(geoId);
    }
  }, [])

  const submitSighting = () => {
    // TO-DO: Check to make sure all required information has been provided
    const imagesInProperFormatForApi = imagesForId.map(image => {
      return {
        imageUrl: image.url,
        organ: image.organ[0]
      }
    })
    
    const sighting = {
      location: {
        longitude: geoLocation.longitude,
        latitude: geoLocation.latitude
      },
      species: speciesForId[0]._id,
      images: imagesInProperFormatForApi
    };


    setWaitingForResponse(true);
    axios.post("/api/id", sighting)
      .then(response => {
        console.log(response.data.verified);
      })
      .catch(err => {
        console.log(err);
      })
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="row mb-3 text-center">
            <h2>Create a Sighting</h2>
          </div>
          <div className="row mb-3">
            <h4>Plant:</h4>
            <SpeciesSelectionId speciesOptions={speciesOptions} selectState={speciesForId} onSelection={setSpeciesForId}/>
          </div>
          <IdPicturesSection imagesForId={imagesForId} setImagesForId={setImagesForId}/>
          <div className="row mb-3">
            <div className="col-md-12">
              <h4>Location</h4>
              <Button variant="outline-primary" onClick={() => setShowMap(true)}><FontAwesomeIcon icon={faMapMarkerAlt} /></Button>
              {showMap ? <IdLocationMap searchLocation={geoLocation} onMapClick={onMapClick}><CurrentLocationMapMarker lng={geoLocation.longitude} lat={geoLocation.latitude}/></IdLocationMap> : null}
            </div>
          </div>
        </div>
        <div className="row mb-3">
            <div className="col-md-12">
              {waitingForResponse ?   <Button variant="primary" disabled><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />Loading...</Button> : <Button variant="primary" onClick={submitSighting}>Submit Sighting</Button>}
            </div>
        </div>
      </div>
    </div>
  )
}

export default IdPage;