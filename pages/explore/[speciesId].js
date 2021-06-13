import SpecimenSearchMap from "../../components/SpecimenSearchMap";
function ExploreSpecies() {
  return (
    <div className="container-fluid">
      <div className="row text-center">
        <div className="col-md-6 offset-md-3">
          <p>Here's the Explore page for a particular species</p>
          <SpecimenSearchMap />
        </div>
      </div>
    </div>
  )
}

export default ExploreSpecies;