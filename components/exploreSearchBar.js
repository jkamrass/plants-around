export default function ExploreSearchBar ({searchLocation}) {
  
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact 
        bootstrapURLKeys={{key: "AIzaSyD5K5fJO3asvidTRdf85iVDGtodw0dp5fk"}}
        defaultCenter={{lng: searchLocation.longitude, lat: searchLocation.latitude}}
        defaultZoom={15}>
      </GoogleMapReact>
    </div>
  )
}