import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SpecimenMapMarker({ key }) {
  return (
    <div style={markerStyle} key={key}>
      <FontAwesomeIcon icon={faLeaf} size="2x" color="green" />
    </div>
  );
}

// sets the marker to center itself on the coordinates, rather than the default of its top left corner being at the coordinates
const markerStyle = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
};
