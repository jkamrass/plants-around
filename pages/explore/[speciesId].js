import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import SpecimenSearchMap from '../../components/exploreMapPage/SpecimenSearchMap';
import SpecimenMapMarker from '../../components/exploreMapPage/specimenMapMarker';
import CurrentLocationMapMarker from '../../components/currentLocationMapMarker';

function ExploreSpecies() {
  const router = useRouter();
  const { speciesId } = router.query;
  const [searchLocation, setSearchLocation] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const [loadingResults, setLoadingResults] = useState(true);
  const [geoLocationError, setGeoLocationError] = useState(false);
  const [specimens, setSpecimens] = useState([]);
  const [speciesInfo, setSpeciesInfo] = useState();

  const handlePositionSuccess = (pos) => {
    setCurrentLocation({
      longitude: pos.coords.longitude,
      latitude: pos.coords.latitude,
    });
    setSearchLocation({
      type: 'point',
      longitude: pos.coords.longitude,
      latitude: pos.coords.latitude,
    });
  };

  // Sets location to default Durham coordinates if geolocation fails
  const handlePositionFailure = (err) => {
    const durhamCoordinates = {
      type: 'point',
      latitude: 35.994034,
      longitude: -78.898621,
    };
    setCurrentLocation(durhamCoordinates);
    setSearchLocation(durhamCoordinates);
    setGeoLocationError(true);
  };

  // Attempts to get the user's geolocation position
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      handlePositionSuccess,
      handlePositionFailure,
      { enableHighAccuracy: true }
    );
  }, []);

  // Retreives the information for species of map sightings
  useEffect(() => {
    if (speciesId) {
      axios.get(`/api/species/${speciesId}`).then((response) => {
        setSpeciesInfo(response.data);
      });
    }
  }, [speciesId]);

  // Retreives the sightings to display on the map
  useEffect(() => {
    if (speciesId) {
      let url = `/api/explore/${speciesId}`;
      if (searchLocation) {
        if (searchLocation.type === 'point') {
          url += `?type=${searchLocation.type}&long=${searchLocation.longitude}&lat=${searchLocation.latitude}`;
        }
        if (searchLocation.type === 'polygon') {
          url += `?type=${searchLocation.type}&neLat=${searchLocation.neLat}&neLong=${searchLocation.neLong}&swLat=${searchLocation.swLat}&swLong=${searchLocation.swLong}`;
        }
        setLoadingResults(true);
        axios.get(url).then((response) => {
          setSpecimens(response.data);
          setLoadingResults(false);
        });
      }
    }
  }, [speciesId, searchLocation, geoLocationError]);

  const generateMapMarkers = (specimensOnMap) => {
    const currentLocationMarker = (
      <CurrentLocationMapMarker
        lng={currentLocation.longitude}
        lat={currentLocation.latitude}
        key="currentLocation"
      />
    );
    const specimenMarkers = specimensOnMap.map((specimen) => (
      <SpecimenMapMarker
        lng={specimen.location.coordinates[0]}
        lat={specimen.location.coordinates[1]}
        key={specimen._id}
      />
    ));
    return [currentLocationMarker, ...specimenMarkers];
  };

  return (
    <div className="container-fluid">
      <div className="row text-center">
        <div className="col-md-12">
          {currentLocation ? (
            <SpecimenSearchMap
              searchLocation={searchLocation}
              setSearchLocation={setSearchLocation}
              speciesInfo={speciesInfo}
              currentLocation={currentLocation}
              loadingResults={loadingResults}
            >
              {generateMapMarkers(specimens)}
            </SpecimenSearchMap>
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExploreSpecies;
