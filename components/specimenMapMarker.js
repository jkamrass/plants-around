import { faLeaf } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default function SpecimenMapMarker ({text}) {
  return (
    <div style={markerStyle}>
      <FontAwesomeIcon icon={faLeaf} size="2x" color="green"/>
    </div>
  )
}

// sets the marker to center itself on the coordinates, rather than the default of its top left corner being at the coordinates
const markerStyle = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)'
}