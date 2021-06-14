import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SpecimenSearchMap from "../../components/SpecimenSearchMap";
import SpecimenMapMarker from "../../components/specimenMapMarker";
import axios from "axios";

function ExploreSpecies() {
  const router = useRouter();
  const {speciesId} = router.query
  const [searchLocation, setSearchLocation] = useState({longitude: -78.8945828, latitude: 36.0083195});
  const [accuracy , setAccuracy] = useState();
  const [geoLocationError, setGeoLocationError] = useState();
  const [specimens, setSpecimens] = useState();
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
  useEffect(() => {
    if(speciesId) {
      axios.get(`/api/explore/${speciesId}?long=${searchLocation.longitude}&lat=${searchLocation.latitude}`)
        .then((response) => {
          debugger;
          setSpecimens(response.data)
        })
    }
  }, [])

  const generateMapMarkers = (specimens) => {
    debugger;
    return specimens.map(specimen => 
      <SpecimenMapMarker
        lng={specimen.location.coordinates[0]}
        lat={specimen.location.coordinates[1]}
        key={specimen._id}
        />
    )
  }


  return (
    <div className="container-fluid">
      <div className="row text-center">
        <div className="col-md-6 offset-md-3">
          <h3>Here's the Explore page for a particular species</h3>
          {searchLocation && specimens ? <SpecimenSearchMap searchLocation={searchLocation}>{generateMapMarkers(specimens)}</SpecimenSearchMap> : <p>Loading</p>}
        </div>
      </div>
    </div>
  )
}

export default ExploreSpecies;