import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import ImageUploader from "../../components/imageUploader";
import SpeciesSelectionId from "../../components/speciesSelectionId";
import { Button } from "react-bootstrap";

function IdPage () {
  const [loaded, setLoaded] = useState(false);
  const [geoLocation, setGeoLocation] = useState(null);
  const [geoLocationAccuracy, setGeoLocationAccuracy] = useState(null);
  const [geoLocationError, setGeoLocationError] = useState(null);
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [speciesForId, setSpeciesForId] = useState([]);
  console.log(geoLocation);
  console.log(geoLocationAccuracy);
  if(loaded) {
    var myWidget = cloudinary.createUploadWidget({
    cloudName: 'my_cloud_name', 
    uploadPreset: 'my_preset'}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info); 
      }
    }
    )
  }

  useEffect(() => {
    // Fetch the possible species to choose from
    axios.get("/api/species")
      .then(response => {
        setSpeciesOptions(response.data);
      })
      .catch(error => {
        console.log(error);
      })
    // Load the Upload Widget from cloudinary
    const script = document.createElement('script');
    script.src = "https://upload-widget.cloudinary.com/global/all.js";
    script.async = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);
  return () => {
      document.body.removeChild(script);
    }
  }, []);

  const onLocationUpdate = (position) => {
    if (!geoLocationAccuracy || position.coords.accuracy < geoLocationAccuracy) {
      setGeoLocation({longitude: position.coords.longitude, latitude: position.coords.latitude});
      setGeoLocationAccuracy(position.coords.accuracy);
    }
  }

  useEffect(() => {
    const geoId = navigator.geolocation.watchPosition(onLocationUpdate);
    return () => {
      console.log('Clear watch called');
      navigator.geolocation.clearWatch(geoId);
    }
  }, [])

  const onSpeciesSelection = (selection) => {
    if (selection.length !== 0) {
      setSpeciesForId(selection[0]._id);
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="row mb-3">
            <h2>What plant is it?</h2>
            <SpeciesSelectionId speciesOptions={speciesOptions} selectState={speciesForId} onSelection={setSpeciesForId}/>
          </div>
          <div className="row mb-3">
            <div className="col-md-12">
              <h2>Your Photos</h2>
              <Button variant="primary" onClick={() => myWidget.open()}>Upload files</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IdPage;