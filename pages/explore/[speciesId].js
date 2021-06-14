import { useEffect, useState } from "react";
import SpecimenSearchMap from "../../components/SpecimenSearchMap";

function ExploreSpecies({speciesId}) {
  const [searchLocation, setSearchLocation] = useState();
  // latitude: 36.0083195
  // longitude: -78.8945828

  // High Accuracy:
  // latitude: 36.012032
  // longitude: -78.8987904
  const getPositionSuccess = pos => {
    console.log(pos)
    //setSearchLocation(pos.coords);
  }
  const getPositionFailure = err => console.log(err);

  useEffect(() => {
    const geoId = navigator.geolocation.watchPosition(getPositionSuccess, getPositionFailure, {enableHighAccuracy: true, maximumAge: 2000, timeout: 5000})
    return () => {
      console.log("Clear Watch Called");
      navigator.geolocation.clearWatch(geoId)
    }
  }, [])


  return (
    <div className="container-fluid">
      <div className="row text-center">
        <div className="col-md-6 offset-md-3">
          <p>Here's the Explore page for a particular species</p>
          {searchLocation ? <SpecimenSearchMap searchLocation={searchLocation} /> : <p>Loading</p>}
        </div>
      </div>
    </div>
  )
}

export default ExploreSpecies;