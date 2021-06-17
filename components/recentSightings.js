import Image from "next/image"

export default function RecentSightings ({recentSightings}) {

  const generateSightingsList = () => {
    if(!recentSightings) {
      return <p>Loading...</p>
    }
    if(recentSightings.length === 0) {
      return <p>No Sightings to Display</p>
    }
    const sightingsList = recentSightings.map(sighting => {
      <div className="col-md-2">
        <div className="card shadow">
          <div className="row g-0">
            <div className="col-6">
              <Image
                src={`${sighting.images[0].imageUrl}`}
                height={250}
                width={250}
                layout="responsive"
                className="card-img-top img-thumbnail"
                alt="..." />
            </div>
            <div className="col-6">
              <div className="card-body">
                <h6 className="card-title">{sighting.createdAt}</h6>
                <p className="card-text">Status: {sighting.verified}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    })
    return sightingsList;
  }
  return (
    <div className="row">
      <div className="col-md-10 offset-md-1">
        <h1>Your Recent Sightings:</h1>
        <div className="row">
          {generateSightingsList()}
        </div>
      </div>
    </div>
  )
}