import 'react-bootstrap-typeahead/css/Typeahead.css';
import Image from "next/image";
import { Typeahead } from "react-bootstrap-typeahead";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';


export default function IdImageCard ({image, setImages}) {
  const organOptions = ["leaf", "fruit", "habit", "flower", "bark", "other"];
  const editPlantOrganForImage = (selection) => {
    setImages((prevState) => prevState.map(imageForId => imageForId.id === image.id ? {...imageForId, organ: selection} : imageForId))
  }
  return (
      <div className="card shadow">
        <div className="row g-0">
          <div className="col-6">
            <Image
              src={`${image.url}`}
              height={250}
              width={250}
              layout="responsive"
              className="card-img-top img-thumbnail"
              alt="..." />
          </div>
          <div className="col-6">
            <div className="card-body">
              <div className="text-end">
                <Button variant="secondary"><FontAwesomeIcon icon={faTrash} /></Button>
              </div>
              <h6 className="card-title">Plant Part:</h6>
              <Typeahead 
                onChange={editPlantOrganForImage}
                options={organOptions}
                id="species"
                labelKey="organ"
                selected={image.organ}
                placeholder="plant part..."
              />
            </div>
          </div>
        </div>
      </div>
  )
}