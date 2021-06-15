import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import ImageUploader from "../../components/imageUploader";
import SpeciesSelectionId from "../../components/speciesSelectionId";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons"
import Image from "next/image";

function IdPage () {
  const [loaded, setLoaded] = useState(false);
  const [geoLocation, setGeoLocation] = useState(null);
  const [geoLocationAccuracy, setGeoLocationAccuracy] = useState(null);
  const [geoLocationError, setGeoLocationError] = useState(null);
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [speciesForId, setSpeciesForId] = useState([]);
  const [imagesForId, setImagesForId] = useState([]);
  console.log(imagesForId);
  if(loaded) {
    var myWidget = cloudinary.createUploadWidget({
    cloudName: 'plants-around', 
    uploadPreset: 'testing',
    sources: ["local", "url", "google_drive"],
    }, (error, result) => { 
      if (!error && result && result.event === "success") {
        const uploadedImage = {
          url: result.info.secure_url,
          thumbnail: result.info.thumbnail_url
        }
        console.log("right before", imagesForId);
        setImagesForId((prevState) => [...prevState, uploadedImage])
        console.log('Done! Here is the image info: ', result.info); 
        console.log(result);
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
              <h2>What does it look like?</h2>
              <Button variant="outline-primary" onClick={() => myWidget.open()}><FontAwesomeIcon icon={faCamera} /></Button>
              <div className="thumbnail-container">
                {imagesForId.map((image, index) => {
                  return (
                    <div className="col-sm-6" key={index}>
                      <div className="card">
                          <div className="row g-0">
                            <div className="col-6">
                              <Image
                                src={`${image.url}`}
                                height={250}
                                width={250}
                                layout="responsive"
                                className="card-img-top img-thumbnail"
                                alt="..." />
                            </div>
                            <div className="col-6 text-start">
                              <div className="card-body">
                                <h6 className="card-title">Image #{index+1}</h6>
                                <p className="card-text text-left">Plant Part:</p>
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IdPage;