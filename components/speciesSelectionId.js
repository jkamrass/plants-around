import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead';

export default function SpeciesSelectionId ({speciesOptions}) {
  return (
    <Typeahead 
      onChange={(selected) => console.log(selected)}
      options={speciesOptions}
      labelKey="name"
      id="species"
    />
  )
}