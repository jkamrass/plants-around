import { XLg, CheckLg } from 'react-bootstrap-icons';
import { Button, Spinner } from 'react-bootstrap';
import Image from 'next/image';

import { useSession } from 'next-auth/client';
import VerifyImageModal from './verifyImageModal';

export default function VerifySighting({
  sightingNeedingVerification,
  submitVerification,
  verificationSubmitted,
  waitingForFetch,
}) {
  const [session, loading] = useSession();

  if (!session) {
    return (
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <h3>Verify a Sighting:</h3>
          <div className="row">
            <div className="col-md-12">
              <p>Create an account to begin verifying sightings!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const generateLoadingSighting = () => (
    <Spinner animation="border" role="status" className="m-3">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );

  const generateSubmittedMessage = () => (
    <div className="row">
      <div className="col-md-12">
        <p>Thank you for help!</p>
      </div>
    </div>
  );

  const generateNoSightingsMessage = () => (
    <div className="row">
      <div className="col-md-12">
        <p>None right now. Check back later!</p>
      </div>
    </div>
  );

  const generateMessage = () => {
    if (verificationSubmitted) {
      return generateSubmittedMessage();
    }
    if (waitingForFetch) {
      return generateLoadingSighting();
    }
    if (!sightingNeedingVerification) {
      return generateNoSightingsMessage();
    }
  };

  const generateSighting = () => (
    <div>
      <div className="row mb-3">
        <div className="col-md-12">
          <h4>Is this a {`${sightingNeedingVerification.species.name}`}?</h4>
          <Button
            variant="primary"
            className="mr-3"
            onClick={() => submitVerification(1)}
          >
            <CheckLg />
          </Button>{' '}
          <Button variant="primary" onClick={() => submitVerification(-1)}>
            <XLg />
          </Button>{' '}
          <Button variant="primary" onClick={() => submitVerification(0)}>
            Unsure
          </Button>
        </div>
      </div>
      <div className="row">
        {sightingNeedingVerification.images.map((imageObject, index) => (
          <div className="col-md-3" key={imageObject.imageUrl}>
            <div className="card shadow">
              <div className="row g-0">
                <div className="col-6">
                  <Image
                    src={`${imageObject.imageUrl}`}
                    height={250}
                    width={250}
                    layout="responsive"
                    className="card-img-top img-thumbnail"
                    alt="..."
                  />
                </div>
                <div className="col-6 text-start">
                  <div className="card-body">
                    <div className="text-end">
                      <VerifyImageModal image={imageObject.imageUrl} />
                    </div>
                    <h6 className="card-title">Image #{index + 1}</h6>
                    <p className="card-text">Plant Part: {imageObject.organ}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="row">
      <div className="col-md-10 offset-md-1">
        <h3>Verify a Sighting:</h3>
        {sightingNeedingVerification ? generateSighting() : generateMessage()}
      </div>
    </div>
  );
}
