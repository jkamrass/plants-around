import axios from "axios";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import SpeciesSelectionId from "../../components/speciesSelectionId";
import { Button, Spinner } from "react-bootstrap";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import IdPicturesSection from "../../components/idPage/idPicturesSection";
import IdLocationSection from "../../components/idPage/idLocationSection";

function IdPage () {
  const locationWatchId = useRef(null);
  const [geoLocation, setGeoLocation] = useState(null);
  const [geoLocationAccuracy, setGeoLocationAccuracy] = useState(null);
  const [geoLocationError, setGeoLocationError] = useState(null);
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [speciesForId, setSpeciesForId] = useState([]);
  const [imagesForId, setImagesForId] = useState([]);
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
    console.log(position);
    if (!geoLocationAccuracy || position.coords.accuracy < geoLocationAccuracy) {
      setGeoLocation({longitude: position.coords.longitude, latitude: position.coords.latitude});
      setGeoLocationAccuracy(position.coords.accuracy);
    }
  }


  useEffect(() => {
    locationWatchId.current = navigator.geolocation.watchPosition(onLocationUpdate);
    return cancelLocationWatch;
  }, [])

  // const stopLocationWatching = () => {
  //   console.log('clear watch called');
  //   navigator.geolocation.clearWatch(geoId);
  // }
  const cancelLocationWatch = () => {
    if (locationWatchId.current && navigator.geolocation) {
      console.log('clear watch called');
      navigator.geolocation.clearWatch(locationWatchId.current);
    }
  };

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
          <IdLocationSection geoLocation={geoLocation} setGeoLocation={setGeoLocation} cancelLocationWatch={cancelLocationWatch}/>
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