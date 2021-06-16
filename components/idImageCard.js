import 'react-bootstrap-typeahead/css/Typeahead.css';
import Image from "next/image";
import { Typeahead } from "react-bootstrap-typeahead";


export default function IdImageCard ({image, setImages}) {
  const organOptions = ["leaf", "fruit", "habit", "flower", "bark", "other"];
  const editPlantOrganForImage = (selection) => {
    debugger;
    setImages((prevState) => prevState.map(imageForId => imageForId.id === image.id ? {...imageForId, organ: selection} : imageForId))
  }
  return (
    <div className="card">
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
        <div className="col-6 text-start">
          <div className="card-body">
            <h6 className="card-title">Plant Part:</h6>
            <Typeahead 
              onChange={editPlantOrganForImage}
              options={organOptions}
              id="species"
              selected={image.organ}
              placeholder="plant part..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}