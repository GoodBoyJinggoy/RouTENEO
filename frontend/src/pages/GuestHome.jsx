import { MapContainer,TileLayer, Polygon, Marker, Popup, Polyline } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import pinIcon from "../assets/img/location-pin.png";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"
import Carousel from "../components/Carousel";
import { markers } from "../data/data_points";
import { ateneoBoundary } from "../data/data_points";
import api from "../api"

import RoutingMachine from "./RoutingMachine";

function GuestHome() {

  const navigate = useNavigate()
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [activeInput, setActiveInput] = useState(null);
  const inputContainerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMarkers, setFilteredMarkers] = useState(markers);

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

  useEffect(() => {
  const results = markers.filter((marker) =>
    marker.popUp.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setFilteredMarkers(results);
}, [searchQuery]);

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

  const customIcon= new Icon({
    iconUrl: pinIcon,
    iconSize:[20,20]
  });

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

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

  useEffect(() => {
    const results = markers.filter((marker) =>
      marker.popUp.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMarkers(results);
  }, [searchQuery]);

  useEffect(() => {
    if (!from?.name || !to?.name) return;
    api
      .get(`/api/comments/?from=${from.name}&to=${to.name}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error(err));
  }, [from, to]);


  return (
    <div className="h-screen w-full flex flex-col overflow-y-scroll">
      <div className="fixed top-0 left-0 w-full bg-blue-800 shadow-md z-[1500] px-4 py-3 flex items-start justify-between">

      {/* LEFT: From + To */}
      <div className="flex flex-col gap-1">
        <h1
          className="absolute inset-0 hidden md:flex items-center justify-center text-white opacity-80 pointer-events-none select-none"
          style={{
            fontFamily: "'Faster One', cursive",
            fontSize: "3rem",
          }}
        >
          RouTENEO
        </h1>

        {/* FROM */}
        <div className="relative">
          <input
            className={`block w-60 max-w-[70vw] px-3 py-2 rounded-md border transition-all duration-200
              ${activeInput === "from" ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}
              focus:border-blue-500 focus:ring-2 focus:ring-blue-300`}
            type="text"
            placeholder="From"
            value={activeInput === "from" ? searchQuery : from?.name || ""}
            onClick={() => {
              setActiveInput("from");
              setSearchQuery("");
            }}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);
              setFrom({ name: value, coords: null });
            }}
          />

          {activeInput === "from" && (
            <div className="absolute top-full left-0 bg-white border w-full max-h-60 overflow-y-auto shadow-md rounded-md z-[2000]">
              {filteredMarkers.map((marker, index) => (
                <div
                  key={index}
                  className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => {
                    setFrom({ name: marker.popUp, coords: marker.geocode });
                    setSearchQuery(marker.popUp);
                    setActiveInput(null);
                  }}
                >
                  {marker.popUp}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TO */}
        <div className="relative">
          <input
            className={`block w-60 max-w-[70vw] px-3 py-2 rounded-md border transition-all duration-200
              ${activeInput === "to" ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}
              focus:border-blue-500 focus:ring-2 focus:ring-blue-300`}
            type="text"
            placeholder="To"
            value={activeInput === "to" ? searchQuery : to?.name || ""}
            onClick={() => {
              setActiveInput("to");
              setSearchQuery("");
            }}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);
              setTo({ name: value, coords: null });
            }}
          />

          {activeInput === "to" && (
            <div className="absolute top-full left-0 bg-white border w-full max-h-60 overflow-y-auto shadow-md rounded-md z-[2000]">
              {filteredMarkers.map((marker, index) => (
                <div
                  key={index}
                  className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => {
                    setTo({ name: marker.popUp, coords: marker.geocode });
                    setSearchQuery(marker.popUp);
                    setActiveInput(null);
                  }}
                >
                  {marker.popUp}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      <button
        onClick={() => navigate("/login")}
        className="fixed top-4 right-4 bg-indigo-500 text-white py-2 px-4 rounded-xl font-semibold
             hover:bg-indigo-600 active:scale-95 transition-all duration-200
             disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Login
      </button>
      </div>

      <div className="mt-32 mx-4 mb-4">
        <div className="rounded-xl overflow-hidden shadow-md border">
          <MapContainer
            center={[14.6396,121.0786]}
            zoom={17}
            minZoom={16}
            maxZoom={18}
            maxBounds={ateneoBounds}
            maxBoundsViscosity={1.0}
            style={{
              height: "calc(100vh - 180px)", // KEY CHANGE
              width: "100%",
            }}
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
                    setActiveInput(null);
                  },
                }}
              >
                <Popup maxWidth={200} minWidth={150}>
                  {marker.images && marker.images.length > 0 ? (
                    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
                    <Carousel>
                    {marker.images.map((image, i) => (
                    <img src={image} alt="Slide" key={i} className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-lg"/>
                    ))}
                    </Carousel>
                    </div>
                  ) : null}
                  
                  <div style={{ fontSize: "20px"}}>
                  <strong>{marker.popUp}</strong>
                  </div>
                  <div style={{ backgroundColor: "#1a237e", display: "inline-block", color: "#FFFFFF", fontSize: "8px", marginRight: "4px" }}>
                  <b>{"⠀" + marker.note + "⠀"}</b>
                  </div>
                  <div>
                  <p>{marker.description}</p>
                  </div>
                </Popup>
              </Marker>
            ))}

          {from?.coords && to?.coords && (
            <RoutingMachine coords={[from.coords, to.coords]}/>
          )}
        </MapContainer>
        </div>
      </div>

      <div className="m-4">
  {from?.name && to?.name ? (
    <div className="p-5 max-h-[340px] overflow-y-auto">
      
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Route Comments
        </h2>
        <p className="text-sm text-gray-500">
          {from.name} → {to.name}
        </p>
      </div>

      {/* Comments List */}
      <div className="space-y-3">
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((c) => (
            <div
              key={c.id}
              className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start gap-3">

                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-blue-300 overflow-hidden flex items-center justify-center shrink-0">
                  {c.profile_picture ? (
                    <img
                      src={c.profile_picture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-semibold">
                      👤
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-800 text-sm">
                      {c.display_name || "Anonymous"}
                    </p>

                    {c.created_at && (
                      <span className="text-xs text-gray-400">
                        {new Date(c.created_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mt-1">
                    {c.text}
                  </p>
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-sm text-gray-500 py-6 border rounded-2xl bg-gray-50">
            No comments available for this route.
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="m-4 text-sm text-gray-500">
      Select a route to view comments.
    </div>
  )}
</div>
    </div>
  )
}

export default GuestHome