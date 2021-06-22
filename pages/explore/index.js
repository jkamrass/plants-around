import axios from "axios";
import { useEffect, useState } from "react";
import NearbySpeciesList from "../../components/nearbySpeciesList";
import SpecimenSearchMap from "../../components/SpecimenSearchMap";
import { Spinner } from "react-bootstrap";
import ExploreDistanceSlider from "../../components/explorePage/exploreDistanceSlider";
import { Typeahead } from "react-bootstrap-typeahead";

function Explore() {
  const [searchLocation, setSearchLocation] = useState();
  const [nearbySpecies, setNearbySpecies] = useState([]);
  const [resultsLoading, setResultsLoading] = useState(true);
  const [searchRadius, setSearchRadius] = useState(1);
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [speciesForSearch, setSpeciesForSearch] = useState([]);

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
    // Fetch the possible species to choose from
    axios.get("/api/species")
      .then(response => {
        setSpeciesOptions(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])
 
  useEffect(() => {
    if (searchLocation) {
      axios.get(`/api/explore?long=${searchLocation.longitude}&lat=${searchLocation.latitude}&dist=${searchRadius}&species=${speciesForSearch[0]?._id}`)
        .then(response => {
          console.log(response);
          setResultsLoading(false);
          setNearbySpecies(response.data);
        })
        .catch(err => {
          console.error(err);
        })
    }
  }, [searchLocation, searchRadius])

  return (
    <div className="container-fluid">
      <div className="row text-center">
        <div className="col-md-10 offset-md-1">
          <h2>Plants Nearby:</h2>
          <div className="row text-start mb-5">
            <div className="col-md-6">
              <div className="mb-3">
                <h6>Plant:</h6>
                <Typeahead 
                  onChange={setSpeciesForSearch}
                  options={speciesOptions}
                  labelKey="name"
                  id="species"
                  selected={speciesForSearch}
                  placeholder="what plant are you looking for..."
                />
              </div>
              <ExploreDistanceSlider searchRadius={searchRadius} setSearchRadius={setSearchRadius} />
            </div>
          </div>
          {resultsLoading ? <Spinner animation="border" role="status" className="m-3"><span className="sr-only">Loading...</span></Spinner> : <NearbySpeciesList nearbySpecies={nearbySpecies}/>}
        </div>
      </div>
    </div>
  )
}

export default Explore;