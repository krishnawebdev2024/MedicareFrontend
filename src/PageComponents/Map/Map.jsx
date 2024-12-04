import L from "leaflet"; // Import Leaflet for custom icons
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ambulance from "../../assets/ambulance.png";

const Map = () => {
  // Locations with custom markers
  const locations = [
    {
      id: 1,
      name: "Medicare Center Berlin, Kaiserstraße 42, 10115 Berlin, Germany",
      position: [52.52, 13.405],
    }, // Berlin coordinates
    {
      id: 2,
      name: "Medicare Center Düsseldorf,Rheinweg 8, 40213 Düsseldorf, Germany",
      position: [51.2217, 6.7762],
    }, // Düsseldorf coordinates
  ];

  // Custom icon
  const customIcon = new L.Icon({
    iconUrl: ambulance, // Replace with your own icon path
    iconSize: [64, 32], // Size of the icon
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative", // Ensure the container is positioned correctly
        zIndex: 1, // Add this to ensure the map has a lower z-index than other components
      }}
    >
      <MapContainer
        center={[52.52, 13.405]}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Loop through locations and render markers with custom icon */}
        {locations.map((loc) => (
          <Marker key={loc.id} position={loc.position} icon={customIcon}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
