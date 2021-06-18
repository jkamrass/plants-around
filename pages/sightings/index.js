import axios from "axios"
import { Button } from "react-bootstrap";
import Image from "next/image";
import { useContext, useEffect, useState } from "react"
import RecentSightings from "../../components/recentSightings";
import UserContext from "../../components/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import {XLg, CheckLg} from "react-bootstrap-icons";
import VerifySighting from "../../components/verifySighting";

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
    // axios.get(`/api/users/${user._id}/recent`)
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

  return (
    <div className="container-fluid">
      <RecentSightings recentSightings={recentSightings}/>
      <VerifySighting sightingNeedingVerification={sightingNeedingVerification} submitVerification={submitVerification}/>
    </div>
  )
}

export default SightingsPage;