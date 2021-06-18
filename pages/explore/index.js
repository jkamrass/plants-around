import axios from "axios";
import { useEffect, useState } from "react";
import NearbySpeciesList from "../../components/nearbySpeciesList";
import SpecimenSearchMap from "../../components/SpecimenSearchMap";
import { Spinner } from "react-bootstrap";

function Explore() {
  const [searchLocation, setSearchLocation] = useState();
  const [nearbySpecies, setNearbySpecies] = useState([]);
  const [resultsLoading, setResultsLoading] = useState(true);


  // latitude: 36.0083195
  // longitude: -78.8945828

  // High Accuracy:
  // latitude: 36.012032
  // longitude: -78.8987904
  const getPositionSuccess = pos => {
    console.log(pos);
    setSearchLocation(pos.coords);
  }

  const getPositionFailure = err => {
    //Default for Durham:
    const durhamCoordinates = {latitude: 35.994034, longitude: -78.898621}
    setSearchLocation(durhamCoordinates);
    console.log(err)
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionFailure)
  }, [])

  useEffect(() => {
    if (searchLocation) {
      axios.get(`/api/explore?long=${searchLocation.longitude}&lat=${searchLocation.latitude}`)
        .then(response => {
          console.log(response);
          setResultsLoading(false);
          setNearbySpecies(response.data);
        })
        .catch(err => {
          console.error(err);
        })
    }
  }, [searchLocation])

  return (
    <div className="container-fluid">
      <div className="row text-center">
        <div className="col-md-10 offset-md-1">
          <h4>Discover Plants Around You:</h4>
          {resultsLoading ? <Spinner animation="border" role="status" className="m-3"><span className="sr-only">Loading...</span></Spinner> : <NearbySpeciesList nearbySpecies={nearbySpecies}/>}
        </div>
      </div>
    </div>
  )
}

export default Explore;