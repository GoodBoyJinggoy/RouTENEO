import { MapContainer,TileLayer, Polygon } from "react-leaflet"
import "leaflet/dist/leaflet.css";

function Home() {
  const firstName = localStorage.getItem("first_name") || "User"
  const lastName = localStorage.getItem("last_name") || ""

  const ateneoBoundary = [
    [14.641668, 121.074818],
    [14.634565, 121.074533],
    [14.634538, 121.075393],
    [14.633976, 121.075326],
    [14.633671, 121.076487],
    [14.633245, 121.0771],
    [14.632782, 121.077583],
    [14.632767, 121.078152],
    [14.633559, 121.079527],
    [14.634558, 121.081651],
    [14.635126, 121.081999],
    [14.635783, 121.082013],
    [14.635875, 121.081762],
    [14.636317, 121.081562],
    [14.637544, 121.081872],
    [14.638349, 121.081963],
    [14.638474, 121.081516],
    [14.640999, 121.082668],
    [14.643927, 121.083681],
    [14.645318, 121.083507],
    [14.646143, 121.083059],
    [14.647046, 121.081257],
    [14.646176, 121.079953],
    [14.643853, 121.080112],
    [14.643721, 121.079717],
    [14.643009, 121.079706],
    [14.642756, 121.079858],
    [14.642253, 121.079183],
    [14.642180, 121.077768],
    [14.642176, 121.076099],
    [14.642330, 121.075651]
  ];

  const worldMask = [
    [
      [-90, -180],
      [-90, 180],
      [90, 180],
      [90, -180],
    ],
    ateneoBoundary
  ];

  const ateneoBounds = [
    [14.6325, 121.0740], 
    [14.6475, 121.0845] 
  ];


  return (
    <div>
      <h1>
        Welcome, User!

        <div className="m-4">
            <MapContainer
              center={[14.6396,121.0786]}
              zoom={17}
              minZoom={16}
              maxZoom={18}
              maxBounds={ateneoBounds}
              maxBoundsViscosity={1.0}
              style={{ height: "600px", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Polygon
                positions={ateneoBoundary}
                pathOptions={{ color: "blue", weight: 4,fill: false }}
              />

              <Polygon
                positions={worldMask}
                pathOptions={{
                  fillColor: "black",
                  fillOpacity: 0.5,
                  stroke: false
                }}
              />
            </MapContainer>

        </div>
      </h1>
    </div>
  )
}

export default Home