import GoogleMapReact from 'google-map-react';

export default function IdLocationMap(props) {
  const { searchLocation, onMapClick } = props;

  const apiIsLoaded = (map, maps) => {
    map.setOptions({ fullscreenControl: false });
  };

  return (
    <div style={{ height: '80vh', width: '100%', position: 'relative' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{
          lng: searchLocation.longitude,
          lat: searchLocation.latitude,
        }}
        defaultZoom={15}
        onClick={onMapClick}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
      >
        {props.children}
      </GoogleMapReact>
    </div>
  );
}
