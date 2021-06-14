import Link from "next/link"
import Image from "next/image";

export default function NearbySpeciesList ({nearbySpecies}) {
  return (
    <div className="row">
      {nearbySpecies.map((aNearbySpecies) => {
        return (
          <div className="col-sm-3" key={aNearbySpecies._id._id}>
            <div className="card">
              <Link href={`/explore/${aNearbySpecies._id._id}`}>
                <div className="row g-0">
                  <div className="col-6">
                    <Image
                      src={`${aNearbySpecies._id.thumbnail}`}
                      height={250}
                      width={250}
                      layout="responsive"
                      className="card-img-top img-thumbnail"
                      alt="..." />
                  </div>
                  <div className="col-6 text-start">
                    <div className="card-body">
                      <h6 className="card-title">{aNearbySpecies._id.name}</h6>
                      Sightings: {aNearbySpecies.numberOfSightings}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}