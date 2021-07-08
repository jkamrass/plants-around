import axios from 'axios';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { XLg, CheckLg } from 'react-bootstrap-icons';
import { useSession } from 'next-auth/client';
import UserContext from '../../components/userContext';
import RecentSightings from '../../components/sightingPage/recentSightings';
import VerifySighting from '../../components/sightingPage/verifySighting';

function SightingsPage() {
  const [session, loading] = useSession();
  const { user, setUser } = useContext(UserContext);
  const [
    sightingNeedingVerification,
    setSightingNeedingVerification,
  ] = useState(false);
  const [waitingForFetch, setWaitingForFetch] = useState(true);
  const [recentSightings, setRecentSightings] = useState();
  const [verificationSubmitted, setVerificationSubmitted] = useState(false);
  const [userCanVerify, setUserCanVerify] = useState(false);
  useEffect(() => {
    // Fetches a sighting that this user can verify if any
    axios
      .get('/api/verify')
      .then((response) => {
        console.log(response);
        setWaitingForFetch(false);
        setSightingNeedingVerification(response.data[0]);
      })
      .catch((err) => {
        setWaitingForFetch(false);
        setSightingNeedingVerification(false);
      });
    if (session) {
      axios
        .get(`/api/users/${session.user.id}/recent`)
        .then((response) => {
          console.log(response);
          setRecentSightings(response.data);
        })
        .catch((err) => {
          console.log(err);
          setRecentSightings([]);
        });
    } else {
      setRecentSightings([]);
    }
  }, []);

  const submitVerification = (moderatorInput) => {
    axios
      .put(`/api/verify/${sightingNeedingVerification._id}`, { moderatorInput })
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });
    setVerificationSubmitted(true);
    setSightingNeedingVerification(false);
  };

  return (
    <div className="container-fluid">
      <RecentSightings recentSightings={recentSightings} />
      <VerifySighting
        user={user}
        sightingNeedingVerification={sightingNeedingVerification}
        submitVerification={submitVerification}
        verificationSubmitted={verificationSubmitted}
        waitingForFetch={waitingForFetch}
      />
    </div>
  );
}

export default SightingsPage;
