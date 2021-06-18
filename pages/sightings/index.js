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
  const [verificationSubmitted, setVerificationSubmitted] = useState(false);
  const [userCanVerify, setUserCanVerify] = useState(false);
  useEffect(() => {
    axios.get("/api/verify")
      .then(response => {
        console.log(response); 
        setWaitingForFetch(false);
        setSightingNeedingVerification(response.data[0]);
      })
      .catch(err => {
        setWaitingForFetch(false);
        setSightingNeedingVerification(false)
      })
    if(user) {
      axios.get(`/api/users/${user._id}/recent`)
        .then(response => {
          console.log(response);
          setRecentSightings(response.data);
        })
        .catch(err => {
          console.log(err);
          setRecentSightings([]);
        })
    } else {
      setRecentSightings([]);
    }
  }, [])

  const submitVerification = (moderatorInput) => {
    axios.put(`/api/verify/${sightingNeedingVerification._id}`, {moderatorInput})
      .then(response => {
        console.log(response);
      })
      .catch(response => {
        console.log(response);
      })
    setVerificationSubmitted(true);
    setSightingNeedingVerification(false);
  }

  return (
    <div className="container-fluid">
      <RecentSightings recentSightings={recentSightings}/>
      <VerifySighting sightingNeedingVerification={sightingNeedingVerification} submitVerification={submitVerification} verificationSubmitted={verificationSubmitted} waitingForFetch={waitingForFetch}/>
    </div>
  )
}

export default SightingsPage;