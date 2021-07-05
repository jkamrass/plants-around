import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/router';
import SpeciesSelectionId from '../../components/idPage/speciesSelectionId';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import IdPicturesSection from '../../components/idPage/idPicturesSection';
import IdLocationSection from '../../components/idPage/idLocationSection';
import UserContext from '../../components/userContext';

function IdPage() {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const [locationOfId, setLocationOfId] = useState(null);
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [speciesForId, setSpeciesForId] = useState([]);
  const [imagesForId, setImagesForId] = useState([]);
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  useEffect(() => {
    // Fetch the possible species the user can choose from
    axios
      .get('/api/species')
      .then((response) => {
        setSpeciesOptions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const submitSighting = () => {
    const imagesInProperFormatForApi = imagesForId.map((image) => ({
      imageUrl: image.url,
      organ: image.organ[0],
    }));
    const sighting = {
      location: {
        longitude: locationOfId.longitude,
        latitude: locationOfId.latitude,
      },
      species: speciesForId[0]._id,
      images: imagesInProperFormatForApi,
    };
    if (user) {
      sighting.user = user._id;
    }

    setWaitingForResponse(true);
    axios
      .post('/api/id', sighting)
      .then((response) => {
        router.push('/sightings');
        console.log(response.data.verified);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Checks to make sure all needed information has been provided for the sighting
  const isSightingComplete = () => {
    if (
      locationOfId &&
      speciesForId.length !== 0 &&
      imagesForId.length !== 0 &&
      imagesForId.every((image) => image.organ.length !== 0)
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="row mb-3 text-center">
            <h2>What Did You Find?</h2>
          </div>
          <SpeciesSelectionId
            speciesOptions={speciesOptions}
            speciesForId={speciesForId}
            setSpeciesForId={setSpeciesForId}
          />
          <IdPicturesSection
            imagesForId={imagesForId}
            setImagesForId={setImagesForId}
          />
          <IdLocationSection
            locationOfId={locationOfId}
            setLocationOfId={setLocationOfId}
          />
          {waitingForResponse ? (
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={submitSighting}
              disabled={!isSightingComplete()}
            >
              Submit Sighting
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default IdPage;
