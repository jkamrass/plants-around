import axios from "axios";
import { useEffect, useState } from "react";
import NearbySpeciesList from "../../components/nearbySpeciesList";
import SpecimenSearchMap from "../../components/SpecimenSearchMap";
function Explore() {
  const [searchLocation, setSearchLocation] = useState();
  const [nearbySpecies, setNearbySpecies] = useState([]);


  // latitude: 36.0083195
  // longitude: -78.8945828

  // High Accuracy:
  // latitude: 36.012032
  // longitude: -78.8987904
  const getPositionSuccess = pos => {
    console.log(pos);
    setSearchLocation(pos.coords);
  }

  const getPositionFailure = err => console.log(err);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionFailure)
  }, [])

  useEffect(() => {
    if (searchLocation) {
      axios.get(`/api/explore?long=${searchLocation.longitude}&lat=${searchLocation.latitude}`)
        .then(response => {
          console.log(response)
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
        <div className="col-md-6 offset-md-3">
          <p>Here's the Explore page</p>
          {nearbySpecies ? <NearbySpeciesList nearbySpecies={nearbySpecies}/>: <p>Results Loading</p>}
          {searchLocation ? <SpecimenSearchMap searchLocation={searchLocation} /> : <p>Loading</p>}
        </div>
      </div>
    </div>
  )
}

export default Explore;