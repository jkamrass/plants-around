import {XLg, CheckLg} from "react-bootstrap-icons";
import { Button, Spinner } from "react-bootstrap";
import Image from "next/image";
import { ZoomIn } from "react-bootstrap-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import VerifyImageModal from "./verifyImageModal";

export default function VerifySighting({ sightingNeedingVerification, submitVerification }) {
  const generateLoadingSighting = () => {
    return (
      <Spinner animation="border" role="status" className="m-3">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  };

  const generateSighting = () => {
    return (
     <div>
      <div className="row mb-3">
        <div className="col-md-12">
          <h4>Is this a {`${sightingNeedingVerification.species.name}`}?</h4>
          <Button variant="primary" className="mr-3" onClick={() => submitVerification(1)}><CheckLg /></Button>{' '}
          <Button variant="primary" onClick={() => submitVerification(-1)}><XLg/></Button>{' '}
          <Button variant="primary" onClick={() => submitVerification(0)}>Unsure</Button>
        </div>
      </div>
      <div className="row">
        {sightingNeedingVerification.images.map((imageObject, index) => {
          return (
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
                        alt="..." />
                    </div>
                    <div className="col-6 text-start">
                      <div className="card-body">
                        <div className="text-end">
                          <VerifyImageModal image={imageObject.imageUrl} />
                        </div>
                        <h6 className="card-title">Image #{index+1}</h6>
                        <p className="card-text">Plant Part: {imageObject.organ}</p>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          );
        })}
      </div>
     </div>
    )
  }

  return (
    <div className="row">
      <div className="col-md-10 offset-md-1">
        <h3>Verify a Sighting:</h3>
        { sightingNeedingVerification ? generateSighting() : generateLoadingSighting()}
      </div>
    </div>
  )
}