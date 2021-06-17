import axios from "axios"
import { Button } from "react-bootstrap";
import Image from "next/image";
import { useContext, useEffect, useState } from "react"
import RecentSightings from "../../components/recentSightings";
import UserContext from "../../components/userContext";

function SightingsPage () {
  const { user, setUser } = useContext(UserContext);
  const [sightingNeedingVerification, setSightingNeedingVerification] = useState(false);
  const [waitingForFetch, setWaitingForFetch] = useState(true);
  const [recentSightings, setRecentSightings] = useState();
  useEffect(() => {
    axios.get("/api/verify")
      .then(response => {
        console.log(response); 
        setSightingNeedingVerification(response.data[0]);
      })
    // axios.get(`/api/user/${user._id}/recent`)
    //   .then(response => {
    //     setRecentSightings(response.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     setRecentSightings([]);
    //   })
  }, [])

  const submitVerification = (moderatorInput) => {
    axios.put(`/api/verify/${sightingNeedingVerification._id}`, {moderatorInput})
      .then(response => {
        console.log(response);
      })
      .catch(response => {
        console.log(response);
      })
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
          <Button variant="primary" onClick={() => submitVerification(1)}>Yes</Button>
          <Button variant="primary" onClick={() => submitVerification(-1)}>No</Button>
          <Button variant="primary" onClick={() => submitVerification(0)}>Unsure</Button>
        </div>
      </div>
     </div>
    )
  }

  return (
    <div className="container-fluid">
      <RecentSightings recentSightings={recentSightings}/>
      { sightingNeedingVerification ? generateSighting() : generateLoadingSighting()}
    </div>
  )
}

export default SightingsPage