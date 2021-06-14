import { useEffect, useState } from "react";
import SpecimenSearchMap from "../../components/SpecimenSearchMap";
import SpecimenMapMarker from "../../components/specimenMapMarker";

function ExploreSpecies({speciesId}) {
  const [searchLocation, setSearchLocation] = useState({longitude: -78.8945828, latitude: 36.0083195});
  const [accuracy , setAccuracy] = useState();
  const [geoLocationError, setGeoLocationError] = useState();
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
          <h3>Here's the Explore page for a particular species</h3>
          {searchLocation ? <SpecimenSearchMap searchLocation={searchLocation}><SpecimenMapMarker lat={36.0083195} lng={-78.8945828} text={"Hello"}/></SpecimenSearchMap> : <p>Loading</p>}
        </div>
      </div>
    </div>
  )
}

export default ExploreSpecies;