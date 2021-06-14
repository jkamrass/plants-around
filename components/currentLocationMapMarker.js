import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default function CurrentLocationMapMarker ({key}) {
  return (
    <div style={markerStyle} key={key}>
      <FontAwesomeIcon icon={faMapMarkerAlt} size="2x"/>
    </div>
  )
}

// sets the marker to center itself on the coordinates, rather than the default of its top left corner being at the coordinates
const markerStyle = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)'
}