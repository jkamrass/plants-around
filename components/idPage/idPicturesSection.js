import { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCheck } from '@fortawesome/free-solid-svg-icons';
import IdImageCard from './idImageCard';

const IdPicturesSection = ({ imagesForId, setImagesForId }) => {
  const [loaded, setLoaded] = useState(false);
  const [cloudinaryWidget, setCloudinaryWidget] = useState();

  useEffect(() => {
    // Load the Upload Widget from cloudinary
    const script = document.createElement('script');
    script.src = 'https://upload-widget.cloudinary.com/global/all.js';
    script.async = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Remove the widget iframe from memory when component unmounts
  // useEffect(() => {
  //   return () => {
  //     if(cloudinaryWidget) {
  //       debugger;
  //       cloudinaryWidget.destroy();
  //     };
  //   };
  // });

  if (loaded && !cloudinaryWidget) {
    const myWidget = cloudinary.createUploadWidget(
      {
        cloudName: 'plants-around',
        uploadPreset: 'testing',
        sources: ['local', 'url', 'google_drive'],
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          const uploadedImage = {
            id: result.info.public_id,
            url: result.info.secure_url,
            thumbnail: result.info.thumbnail_url,
            organ: [],
          };
          setImagesForId((prevState) => [...prevState, uploadedImage]);
        }
      }
    );

    setCloudinaryWidget(myWidget);
  }

  const areImagesReady = () => {
    if (
      imagesForId.length !== 0 &&
      imagesForId.every((image) => image.organ.length !== 0)
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="row mb-3">
      <div className="col-md-12">
        <h4>
          Pictures (Add up to 5):{' '}
          {areImagesReady() ? (
            <span>
              <FontAwesomeIcon icon={faCheck} color="green" />
            </span>
          ) : null}
        </h4>
        {cloudinaryWidget ? (
          <Button
            variant="outline-primary"
            onClick={() => cloudinaryWidget.open()}
          >
            <FontAwesomeIcon icon={faCamera} />
          </Button>
        ) : (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <div className="row thumbnail-container">
          {imagesForId.map((image) => (
            <div className="col-sm-6" key={image.id}>
              <IdImageCard image={image} setImages={setImagesForId} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IdPicturesSection;
