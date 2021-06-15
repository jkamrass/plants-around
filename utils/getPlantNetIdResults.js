import axios from "axios";

const getPlantNetIdResults = (imagesWithOrganLabels) => {
  const generateIdUrl = (imagesWithOrganLabels) => {
    const baseUrl = `https://my-api.plantnet.org/v2/identify/all?api-key=${process.env.PLANT_NET_API_KEY}`;
    const encodedImageUrls = imagesWithOrganLabels.map((image) => encodeURIComponent(image.imageUrl));
    const imagesQuery = encodedImageUrls.reduce((imagesUrlPortion, imageUrl) => `${imagesUrlPortion}&images=${imageUrl}`, '');
    const organsQuery = imagesWithOrganLabels.reduce((organsUrlPortion, image) => `${organsUrlPortion}&organs=${image.organ}`, '');
    const finalUrl = baseUrl+imagesQuery+organsQuery;
    return finalUrl;
  }
  const idUrl = generateIdUrl(imagesWithOrganLabels);
  const plantNetIdResponse = axios.get(idUrl);
  return plantNetIdResponse;
}

export default getPlantNetIdResults