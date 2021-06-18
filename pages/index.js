import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { faMap } from '@fortawesome/free-solid-svg-icons'
import { Button, Spinner } from 'react-bootstrap'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);

  const begin = () => {
    setClicked(true);
    router.push("/explore");
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 justify-content-center" style={{height: "95vh", backgroundColor: "#e1eedd"}}>
          <div className="d-flex flex-column justify-content-center text-center" style={{height: "80vh"}}>
            <h1>Ready to Explore</h1>
            <h1>Plants in Durham?</h1>
            <div className="col-md-12">
              {clicked ? <Spinner animation="border" role="status" ><span className="sr-only">Loading...</span></Spinner> : <Button onClick={begin}>What's Around Me?</Button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
