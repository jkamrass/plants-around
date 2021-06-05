// import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchIdResultsLocal, updateUserImages, resetIdSearch } from '../../actions/index';
// import { useHistory } from 'react-router-dom';
import SearchImageThumbnail from './SearchImageThumbnail';


const IdLocal = () => {
  const [images, setImages] = useState([]);
  const [types, setTypes] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewType, setPreviewType] = useState('leaf');
  // const dispatch = useDispatch();
  // const history = useHistory();

  useEffect(() => dispatch(resetIdSearch()), [])
  
  const handleFileInput = (e) => {
    debugger;
    //Makes sure there is actually a file. If someone closes the browse file without choosing a file it will still trigger this event.
    if (!e.target.files.length) {
      return;
    }
    // Makes sure the user chose only one image 
    if (e.target.files.length !== 1) {
      alert("Please upload only one image at a time");
      return;
    }
    //Validation of that file is indeed an image (jpeg, pnp, jpg)
    const fileType = e.target.files[0].type
    if (fileType !== "image/jpeg" && fileType !== "image/png"  && fileType !== "image/jpg") {
      alert("File must be a photo (jpeg, png, jpg)");
      return;
    }
    
    setPreviewImage({
      image: e.target.files[0],
      imageUrl: URL.createObjectURL(e.target.files[0])
    })

    e.target.value = null;
    //setImage();
    //setPreviewImage(URL.createObjectURL(e.target.files[0]))
  }

  const addImage = () => {
    debugger;
    setImages(images.concat(previewImage));
    setTypes(types.concat(previewType));
    setPreviewImage(null);
    setPreviewType('leaf');
  }

  const deleteImage = (indexOfImageToBeDeleted) => {
    setImages(images.filter((image, index) => index !== indexOfImageToBeDeleted));
    setTypes(types.filter((type, index) => index !== indexOfImageToBeDeleted));
  }

  const handleGetIdClick = () => {
    dispatch(fetchIdResultsLocal(images, types));
    dispatch(updateUserImages(images.map((image) => image.imageUrl)))
    history.push('/id/result');
  }

  const generateGetIdButton = () => (
    <div className='col-sm-6 offset-sm-3 text-center'>
      <button className="btn btn-success btn-lg" type="button" onClick={handleGetIdClick}>Get ID</button>
    </div>
  )

  const generateSearchImageThumbnails = () => images.map((image, index) => <SearchImageThumbnail image={image.imageUrl} imageNumber={index} type={types[index]} deleteImage={deleteImage}/>);

  const generateLocalInputForm = () => (
    <div className="mb-3">
      <label htmlFor="fileInput">Upload one image at a time and select part of plant displayed in image (leaf is safest bet if unsure):</label>
      <div className="input-group" id="fileInput">
        <div className="custom-file">
          <input type='file' onChange={handleFileInput} id='inputGroupFile01'/>
          <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
        </div>
        <select className="custom-select" id="inputGroupSelect01" onChange={(e) => setPreviewType(e.target.value)} value={previewType}>
          <option value="leaf">leaf</option>
          <option value="flower">flower</option>
          <option value="fruit">fruit</option>
          <option value="habit">habit</option>
          <option value="bark">bark</option>
          <option value="other">other</option>
        </select>
        <button className="btn btn-outline-secondary" type="button" onClick={addImage}>Add Photo</button>
      </div>
    </div>
  )

  return (
    <>
      <div className='row'>
        <div className='col-sm-8 offset-md-2'>
          <h3>Local Upload</h3>
          <p>You can provide up to 5 images of one plant for the id. Please note, our tech works best with photos at least 600x600p</p>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-6 offset-md-3'>
          {images.length < 5 ? generateLocalInputForm() : <h3>Max Number of Images Reached</h3>}  
        </div>
        <div className="col-sm-2">
          {previewImage ? <img src={previewImage?.imageUrl} alt='' className="img-thumbnail"/> : null}
        </div>
      </div>

      <div className='row'>
        {images.length !== 0 ? generateGetIdButton() : null}
      </div>
    
      <div className='row pb-5'>
        <div className='col-sm-1'></div>
        {images.length !== 0 ? generateSearchImageThumbnails() : null}
      </div>
    </>
  )
}
export default IdLocal