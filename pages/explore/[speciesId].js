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
  const [speciesInfo, setSpeciesInfo] = useState();

  const handlePositionSuccess = pos => {
    setSearchLocation(pos.coords);
    setAccuracy(pos.coords.accuracy);
  };
  const handlePositionFailure = err => {
    const durhamCoordinates = {latitude: 35.994034, longitude: -78.898621};
    setSearchLocation(durhamCoordinates);
    setGeoLocationError(true);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handlePositionSuccess, handlePositionFailure, {enableHighAccuracy: true});
  }, [])

  useEffect(() => {
    if(speciesId) {
      axios.get(`/api/species/${speciesId}`)
        .then(response => {
          setSpeciesInfo(response.data);
        });
    };
  }, [speciesId]);

  useEffect(() => {
    if(speciesId) {
      let url = `/api/explore/${speciesId}`;
      if (searchLocation) {
        url += `?long=${searchLocation.longitude}&lat=${searchLocation.latitude}`;
      } else if (geoLocationError) {
        url += `?long=${-78.898621}&lat=${35.994034}`;
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
          {searchLocation ? <SpecimenSearchMap searchLocation={searchLocation} speciesInfo={speciesInfo}>{generateMapMarkers(specimens)}</SpecimenSearchMap> : <p>Loading</p>}
        </div>
      </div>
    </div>
  )
}

export default ExploreSpecies;