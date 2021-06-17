import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function SpeciesSelectionId ({speciesOptions, speciesForId, setSpeciesForId}) {
  return (
    <div className="row mb-3">
      <h4>Plant: {speciesForId.length !== 0 ? <span><FontAwesomeIcon icon={faCheck} color="green"/></span> : null}</h4>
      <Typeahead 
        onChange={setSpeciesForId}
        options={speciesOptions}
        labelKey="name"
        id="species"
        selected={speciesForId}
        placeholder="plant name..."
      />
    </div>
  )
}