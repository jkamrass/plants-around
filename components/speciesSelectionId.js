import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead';

export default function SpeciesSelectionId ({speciesOptions, selectState, onSelection}) {
  return (
    <Typeahead 
      onChange={onSelection}
      options={speciesOptions}
      labelKey="name"
      id="species"
      selected={selectState}
      placeholder="plant name..."
    />
  )
}