import Link from "next/link"
import Image from "next/image";

export default function NearbySpeciesList ({nearbySpecies}) {
  return (
    <div className="row">
      {nearbySpecies.map((aNearbySpecies) => {
        return (
          <div key={aNearbySpecies._id._id} className="card">
            <Link href={`/explore/${aNearbySpecies._id._id}`}>
              <div>
                <Image
                  src={`${aNearbySpecies._id.thumbnail}`}
                  height={250}
                  width={250}
                  layout="responsive"
                  className="card-img-top"
                  alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{aNearbySpecies._id.name}</h5>
                  Number of Sightings in your area: {aNearbySpecies.numberOfSightings}
                </div>
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}