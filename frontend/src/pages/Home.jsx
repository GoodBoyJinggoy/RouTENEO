import { MapContainer,TileLayer, Polygon, Marker, Popup, Polyline } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import pinIcon from "../assets/img/location-pin.png";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"


function Home() {
  const firstName = localStorage.getItem("first_name") || "User"
  const lastName = localStorage.getItem("last_name") || ""
  const navigate = useNavigate()
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [activeInput, setActiveInput] = useState(null);
  const inputContainerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        inputContainerRef.current &&
        !inputContainerRef.current.contains(event.target)
      ) {
        setActiveInput(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const ateneoBoundary = [
    [14.641585, 121.074739],
    [14.641025, 121.074700],
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
    [14.642330, 121.075651],
    
    
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

  const markers = [
  { geocode:[14.634666,121.074539], popUp:"Gate 1" },
  { geocode:[14.635807,121.074598], popUp:"Gate 2" },
  { geocode:[14.64053,121.074687], popUp:"Gate 3.5" },
  { geocode:[14.634463,121.076798], popUp:"Ateneo Grade School" },
  { geocode:[14.63491,121.075553], popUp:"Blue Eagle Gym" },
  { geocode:[14.641337,121.075958], popUp:"Arete Museum" },
  { geocode:[14.636929,121.078565], popUp:"Covered Courts" },
  { geocode:[14.641579,121.079373], popUp:"Bellarmine Hall" },
  { geocode:[14.636139,121.077589], popUp:"Manila Observatory" },
  { geocode:[14.640843,121.076296], popUp:"Leong Hall" },
  { geocode:[14.640116,121.078463], popUp:"Xavier Hall" },
  { geocode:[14.640191,121.078045], popUp:"Faber Hall" },
  { geocode:[14.640261,121.077291], popUp:"Old Rizal Library" },
  { geocode:[14.640619,121.076691], popUp:"Social Sciences Building" },
  { geocode:[14.639757,121.078088], popUp:"Kostka Hall" },
  { geocode:[14.639734,121.077704], popUp:"MVP Center" },
  { geocode:[14.640009,121.076961], popUp:"Dela Costa Hall" },
  { geocode:[14.640001,121.076243], popUp:"New Rizal Library" },
  { geocode:[14.63948,121.078303], popUp:"Berchmans Hall" },
  { geocode:[14.639506,121.077004], popUp:"Faura Hall" },
  { geocode:[14.639145,121.077578], popUp:"Schmitt Hall" },
  { geocode:[14.638963,121.078008], popUp:"Gonzaga Hall" },
  { geocode:[14.638808,121.076784], popUp:"PIPAC" },
  { geocode:[14.638507,121.077576], popUp:"SEC A" },
  { geocode:[14.638172,121.077197], popUp:"SEC B" },
  { geocode:[14.638283,121.076953], popUp:"SEC C" },
  { geocode:[14.638382,121.076733], popUp:"PLDT-CTC" },
  { geocode:[14.638452,121.076422], popUp:"JGSOM" },
  { geocode:[14.637892,121.076503], popUp:"JSEC" },
  { geocode:[14.637596,121.076988], popUp:"Matteo Ricci Hall" }
];

  const customIcon= new Icon({
    iconUrl: pinIcon,
    iconSize:[20,20]
  });

  return (
    <div>
      <div className="m-4 flex flex-col gap-2">
        <input
          className={`block w-52 px-3 py-2 rounded-md border transition-all duration-200
            ${activeInput === "from" ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}
            focus:border-blue-500 focus:ring-2 focus:ring-blue-300`}
          type="text"
          placeholder="From"
          value={from?.name || ""}
          onClick={() => setActiveInput("from")}
          readOnly
        />

        <input
          className={`block w-52 px-3 py-2 rounded-md border transition-all duration-200
            ${activeInput === "to" ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}
            focus:border-blue-500 focus:ring-2 focus:ring-blue-300`}
          type="text"
          placeholder="To"
          value={to?.name || ""}
          onClick={() => setActiveInput("to")}
          readOnly
        />
      </div>

      <div ref={inputContainerRef} className="m-4 border-2 border-black-500">
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
            pathOptions={{ color: "blue", weight: 2,fill: false }}
          />

          <Polygon
            positions={worldMask}
            pathOptions={{
              fillColor: "grey",
              fillOpacity: 0.5,
              stroke: false
            }}
          />

          {markers.map((marker, index) => (
              <Marker
                key={index}
                position={marker.geocode}
                icon={customIcon}
                eventHandlers={{
                  click: () => {
                    if (activeInput === "from") {
                      setFrom({ name: marker.popUp, coords: marker.geocode });
                    } else if (activeInput === "to") {
                      setTo({ name: marker.popUp, coords: marker.geocode });
                    }
                  },
                }}
              >
                <Popup>{marker.popUp}</Popup>
              </Marker>
            ))}

          {from && to && (
            <Polyline
              positions={[from.coords, to.coords]}
              pathOptions={{ color: "red", weight: 4 }}
            />
          )}
        </MapContainer>
      </div>

      <button
        onClick={() => navigate("/logout")}
        className="fixed top-4 right-4 bg-indigo-500 text-white py-2 px-4 rounded-xl font-semibold
             hover:bg-indigo-600 active:scale-95 transition-all duration-200
             disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Logout
      </button>
    </div>
  )
}

export default Home