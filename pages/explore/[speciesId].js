import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SpecimenSearchMap from "../../components/SpecimenSearchMap";
import SpecimenMapMarker from "../../components/specimenMapMarker";
import axios from "axios";
import CurrentLocationMapMarker from "../../components/currentLocationMapMarker";

function ExploreSpecies() {
  const router = useRouter();
  const {speciesId} = router.query
  const [searchLocation, setSearchLocation] = useState();
  const [accuracy , setAccuracy] = useState();
  const [geoLocationError, setGeoLocationError] = useState(false);
  const [specimens, setSpecimens] = useState([]);
  // latitude: 36.0083195
  // longitude: -78.8945828

  // High Accuracy:
  // latitude: 36.012032
  // longitude: -78.8987904
  // const getPositionSuccess = pos => {
  //   console.log(pos)
  //   //setSearchLocation(pos.coords);
  // }
  // const getPositionFailure = err => console.log(err);

  // useEffect(() => {
  //   const geoId = navigator.geolocation.watchPosition(getPositionSuccess, getPositionFailure, {enableHighAccuracy: true, maximumAge: 2000, timeout: 5000})
  //   return () => {
  //     console.log("Clear Watch Called");
  //     navigator.geolocation.clearWatch(geoId)
  //   }
  // }, [])
  const handlePositionSuccess = pos => {
    setSearchLocation(pos.coords);
    setAccuracy(pos.coords.accuracy);
  };
  const handlePositionFailure = err => setGeoLocationError(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handlePositionSuccess, handlePositionFailure, {enableHighAccuracy: true})
  }, [])

  useEffect(() => {
    if(speciesId) {
      let url = `/api/explore/${speciesId}`;
      if (searchLocation) {
        url += `?long=${searchLocation.longitude}&lat=${searchLocation.latitude}`;
      } else if (geoLocationError) {
        url += `?long=${-78.8945828}&lat=${36.0083195}`;
      }
      axios.get(url)
        .then((response) => {
          setSpecimens(response.data)
        })
    }
  }, [speciesId, searchLocation, geoLocationError])

  const generateMapMarkers = (specimens) => {
    const currentLocationMarker = <CurrentLocationMapMarker
      lng={searchLocation.longitude}
      lat={searchLocation.latitude}
      key="currentLocation" />
    const specimenMarkers = specimens.map(specimen => 
      <SpecimenMapMarker
        lng={specimen.location.coordinates[0]}
        lat={specimen.location.coordinates[1]}
        key={specimen._id}
        />
    );
    return [currentLocationMarker, ...specimenMarkers];
  }


  return (
    <div className="container-fluid">
      <div className="row text-center">
        <div className="col-md-12">
          {searchLocation ? <SpecimenSearchMap searchLocation={searchLocation}>{generateMapMarkers(specimens)}</SpecimenSearchMap> : <p>Loading</p>}
        </div>
      </div>
    </div>
  )
}

export default ExploreSpecies;