import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { faMap } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'

export default function Home() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 justify-content-center" style={{height: "95vh", backgroundColor: "#e1eedd"}}>
          <div className="d-flex flex-column justify-content-center text-center" style={{height: "80vh"}}>
            <h1>Ready to Explore</h1>
            <h1>Plants in Durham?</h1>
            <div className="col-md-12">
              <Link href="/explore"><Button>What's Around Me?</Button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
