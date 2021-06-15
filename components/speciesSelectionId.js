import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead';

export default function SpeciesSelectionId () {
  return (
    <Typeahead 
      onChange={(selected) => console.log(selected)}
      options={["Denver", "Durham"]}
    />
  )
}