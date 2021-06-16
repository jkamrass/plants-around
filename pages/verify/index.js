import axios from "axios"
import { Button } from "react-bootstrap";
import Image from "next/image";
import { useEffect, useState } from "react"

function VerifyPage () {
  const [sightingNeedingVerification, setSightingNeedingVerification] = useState(false);
  const [waitingForFetch, setWaitingForFetch] = useState(true);
  useEffect(() => {
    axios.get("/api/verify")
      .then(response => {
        console.log(response); 
        setSightingNeedingVerification(response.data[0]);
      })
  }, [])
  console.log(sightingNeedingVerification);

  const submitVerification = (moderatorSelection) => {
    axios.put(`/api/verify/${sightingNeedingVerification._id}`)
  }

  const generateLoadingSighting = () => {
    return (
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <h3>Waiting for a sighting needing verification</h3>
          </div>
        </div>
    )
  };

  const generateSighting = () => {
    return (
     <div>
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <h1>Is this a {`${sightingNeedingVerification.species.name}`}?</h1>
        </div>
      </div>
      <div className="row">
        {sightingNeedingVerification.images.map(imageObject => {
          return (
            <div className="col-md-2">
              <div className="card">
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
                        <h6 className="card-title">Image</h6>
                        Plant Part: {imageObject.organ}
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Button variant="primary">Yes</Button>
          <Button variant="primary">No</Button>
          <Button variant="primary">Unsure</Button>
        </div>
      </div>
     </div>
    )
  }

  return (
    <div className="container-fluid">
      { sightingNeedingVerification ? generateSighting() : generateLoadingSighting()}
    </div>
  )
}

export default VerifyPage