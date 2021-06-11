import Head from "next/head";
import { useEffect, useState } from "react";
import ImageUploader from "../../components/imageUploader";

function IdPage () {
  const [loaded, setLoaded] = useState(false);

  if(loaded) {
    var myWidget = cloudinary.createUploadWidget({
    cloudName: 'my_cloud_name', 
    uploadPreset: 'my_preset'}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info); 
      }
    }
    )
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://upload-widget.cloudinary.com/global/all.js";
    script.async = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);
  return () => {
      document.body.removeChild(script);
    }
  }, []);
  return (
    <>
      <ImageUploader/>
      {loaded ? <button id="upload_widget" className="cloudinary-button" onClick={() => myWidget.open()}>Upload files</button> : <p>Still Loading</p>}
    </>
  )
}

export default IdPage;