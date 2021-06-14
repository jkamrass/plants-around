import Link from "next/link"

export default function NearbySpeciesList ({nearbySpecies}) {
  return (
    <div className="row">
      {nearbySpecies.map((aNearbySpecies) => {
        return (
          <div key={aNearbySpecies._id._id} className="card">
              <Link href={`/explore/${aNearbySpecies._id._id}`}>
              <div className="card-body">
                <h5 className="card-title">{aNearbySpecies._id.name}</h5>
                Number of Sightings in your area: {aNearbySpecies.numberOfSightings}
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}