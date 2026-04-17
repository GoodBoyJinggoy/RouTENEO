import { MapContainer,TileLayer, Polygon, Marker, Popup, Polyline } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import pinIcon from "../assets/img/location-pin.png";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"
import Carousel from "../components/Carousel";
import api from "../api";

import gate1_1 from "../assets/pictures/gate1/gate1_1.png";
import gate1_2 from "../assets/pictures/gate1/gate1_2.png";
import gate1_3 from "../assets/pictures/gate1/gate1_3.png";

import faura_1 from "../assets/pictures/faura/faura_1.jpg";
import faura_2 from "../assets/pictures/faura/faura_2.jpg";

function Home() {

  const markers = [
  { geocode:[14.634666,121.074539], popUp:"Gate 1", 
    note: "Campus Access Point ", 
    description: "Campus access point for pedestrians, located near the Ateneo Grade School. Closest access point from LRT2-Katipunan station and terminal for UP Diliman-bound jeepneys. Enter here for easier access to Line A e-jeep services, the Ateneo Grade School, and the Blue Eagle Gym." , 
    images: 
    [ gate1_1,
      gate1_2,
      gate1_3 ] 
  },
  { geocode:[14.635807,121.074598], popUp:"Gate 2",
    note: "Campus Access Point",
    description: "Vehicular entry point only. For pedestrians, proceed to Gate 2.5, which is the best access point to enter/exit if coming from/to the vicinity of Shakey's Katipunan, or if coming from/to Metrolink services.",
    images:
    ['']
  },
  { geocode:[14.64053,121.074687], popUp:"Gate 3.5",
    note: "Campus Access Point",
    description: "Campus access point for pedestrians, mainly serving people to/from Regis Center. Enter here for easier access to the LS Complex via Leong Hall, Arete, Line B e-jeep services to Ateneo High School, and the Church of the Gesu",
    images:
    ['']
   },
  { geocode:[14.634463,121.076798], popUp:"Ateneo Grade School",
    note: "AGS",
    description: "Ateneo Grade School",
    images:
    ['']
   },
  { geocode:[14.63491,121.075553], popUp:"Blue Eagle Gym" ,
    note: "LS Campus",
    description: "",
    images:
    ['']
  },
  { geocode:[14.641337,121.075958], popUp:"Arete Museum",
    note: "LS Campus",
    description: "Houses the Ateneo Art Gallery, classroom space, and (arguably) one of the better comfort rooms in Ateneo.",
    images:
    ['']
  },
  { geocode:[14.636929,121.078565], popUp:"Covered Courts",
    note: "LS Campus",
    description: "",
    images:
    ['']
  },
  { geocode:[14.641579,121.079373], popUp:"Bellarmine Hall",
    note: "LS Campus",
    description: "A former dormitory, converted to classroom space.",
    images:
    ['']
  },
  { geocode:[14.636139,121.077589], popUp:"Manila Observatory",
    note: "LS Campus",
    description: "",
    images:
    ['']
  },
  { geocode:[14.640843,121.076296], popUp:"Leong Hall",
    note: "LS Complex",
    description: "",
    images:
    ['']
  },
  { geocode:[14.640116,121.078463], popUp:"Xavier Hall",
    note: "LS Complex",
    description: "",
    images:
    ['']
  },
  { geocode:[14.640191,121.078045], popUp:"Faber Hall",
    note: "LS Complex",
    description: "",
    images:
    ['']
  },
  { geocode:[14.640261,121.077291], popUp:"Old Rizal Library",
    note: "LS Complex",
    description: "",
    images:
    ['']
  },
  { geocode:[14.640619,121.076691], popUp:"Social Sciences Building",
    note: "LS Complex",
    description: "Have to go to the Office of Health Services for BINHI/PUNLA/BIGKIS Medical Clearance, or to undergo a drug test because you were randomly selected? This is the place to go!",
    images:
    ['']
  },
  { geocode:[14.639757,121.078088], popUp:"Kostka Hall",
    note: "LS Complex",
    description: "Home of the OAA",
    images:
    ['']
  },
  { geocode:[14.639734,121.077704], popUp:"MVP Center",
    note: "LS Complex",
    description: "The home of COA-accredited organizations, and the A-Shop/LS Bookstore!",
    images:
    ['']
  },
  { geocode:[14.640009,121.076961], popUp:"Dela Costa Hall",
    note: "LS Complex",
    description: "<add>",
    images:
    ['']
  },
  { geocode:[14.640001,121.076243], popUp:"New Rizal Library",
    note: "LS Complex",
    description: "Housed in the First Pacific Hall, this houses ",
    images:
    ['']
  },
  { geocode:[14.63948,121.078303], popUp:"Berchmans Hall",
    note: "LS Complex",
    description: "Classroom space",
    images:
    ['']
  },
  { geocode:[14.639506,121.077004], popUp:"Faura Hall",
    note: "LS Complex",
    description: "Houses the Department of Information Systems and Computer Science (DISCS) faculty room and numerous DISCS computer labs",
    images:
    [ faura_1,
      faura_2
    ]
  },
  { geocode:[14.639145,121.077578], popUp:"Schmitt Hall",
    note: "LS Complex",
    description: "former home of paopao 🕊️",
    images:
    ['']
  },
  { geocode:[14.638963,121.078008], popUp:"Gonzaga Hall",
    note: "LS Complex",
    description: "A central cafeteria, hosting numerous dining options and food choices.",
    images:
    ['']
  },
  { geocode:[14.638808,121.076784], popUp:"PIPAC",
    note: "LS Complex",
    description: "Philippine Institute of Pure and Applied Chemistry 𓀀 𓀁 𓀂 𓀃 𓀄 𓀅 𓀆 𓀇 𓀈 𓀉 𓀊 𓀋 𓀌 𓀍 𓀎 𓀏 𓀐 𓀑 𓀒 𓀓 𓀔 𓀕 𓀖 𓀗 𓀘 𓀙 𓀚 𓀛 𓀜 𓀝 𓀞 𓀟 𓀠 𓀡 𓀢 𓀣 𓀤 𓀥 𓀦 𓀧 𓀨 𓀩 𓀪 𓀫 𓀬 𓀭 𓀮 𓀯 𓀰 𓀱 𓀲 𓀳 𓀴 𓀵 𓀶 𓀷 𓀸 𓀹 𓀺 𓀻 𓀼 𓀽 𓀾 𓀿 𓁀 𓁁 𓁂 𓁃 𓁄 𓁅 𓁆 𓁇 𓁈 𓁉 𓁊 𓁋 𓁌 𓁍 𓁎 𓁏 𓁐 𓁑",
    images:
    ['']
  },
  { geocode:[14.638507,121.077576], popUp:"SEC A",
    note: "LS Complex",
    description: "Home of the Department of Mathematics",
    images:
    ['']
  },
  { geocode:[14.638172,121.077197], popUp:"SEC B",
    note: "LS Complex",
    description: "Houses Biology labs",
    images:
    ['']
  },
  { geocode:[14.638283,121.076953], popUp:"SEC C",
    note: "LS Complex",
    description: "Houses Physics labs",
    images:
    ['']
  },
  { geocode:[14.638382,121.076733], popUp:"PLDT-CTC",
    note: "LS Complex",
    description: "Classroom space",
    images:
    ['']
  },
  { geocode:[14.638452,121.076422], popUp:"JGSOM",
    note: "LS Complex",
    description: "Classroom space",
    images:
    ['']
  },
  { geocode:[14.637892,121.076503], popUp:"JSEC",
    note: "LS Complex",
    description: "A dining area between SEC-C and CTC, with stalls featuring JSEC challenge winners",
    images:
    ['']
  },
  { geocode:[14.637596,121.076988], popUp:"Matteo Ricci Hall",
    note: "LS Complex",
    description: "Currently under renovation work, this housed Rizal Library computer rooms, and featured an open-air seating area on the 2nd floor.",
    images:
    ['']
  }
];

  const navigate = useNavigate()
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [activeInput, setActiveInput] = useState(null);
  const inputContainerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMarkers, setFilteredMarkers] = useState(markers);

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

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      const res = await api.post("/api/comments/", {
        from_location: from.name,
        to_location: to.name,
        text: commentText,
      });
      setComments((prev) => [res.data, ...prev]);
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

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

  const customIcon= new Icon({
    iconUrl: pinIcon,
    iconSize:[20,20]
  });

  return (
    <div>
      <div className="m-4 flex flex-col gap-2 relative w-52">
        <div className="relative">
          <input
            className={`block w-52 px-3 py-2 rounded-md border transition-all duration-200
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
              if (activeInput === "from") setFrom({ name: value, coords: null });
              else if (activeInput === "to") setTo({ name: value, coords: null });
            }}
          />
          {activeInput === "from" && (
            <div className="absolute top-full left-0 bg-white border w-52 max-h-60 overflow-y-auto shadow-md rounded-md z-[1100]">
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

        <div className="relative">
          <input
            className={`block w-52 px-3 py-2 rounded-md border transition-all duration-200
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
              if (activeInput === "from") setFrom({ name: value, coords: null });
              else if (activeInput === "to") setTo({ name: value, coords: null });
            }}
          />
          {activeInput === "to" && (
            <div className="absolute top-full left-0 bg-white border w-52 max-h-60 overflow-y-auto shadow-md rounded-md z-[1100]">
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

      <div className="m-4 relative border-2 border-black">
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

          <Polygon positions={ateneoBoundary} pathOptions={{ color: "blue", weight: 2,fill: false }} />
          <Polygon positions={worldMask} pathOptions={{ fillColor: "grey", fillOpacity: 0.5, stroke: false }} />

          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.geocode}
              icon={customIcon}
              eventHandlers={{
                click: () => {
                  if (activeInput === "from") setFrom({ name: marker.popUp, coords: marker.geocode });
                  else if (activeInput === "to") setTo({ name: marker.popUp, coords: marker.geocode });
                  setActiveInput(null);
                },
              }}
            >
              <Popup>
                {marker.images && marker.images.length > 0 ? (
                  <Carousel>
                    {marker.images.map((image, i) => (
                      <img src={image} alt="Slide" key={i} />
                    ))}
                  </Carousel>
                ) : null}
                <div style={{ fontSize: "20px"}}><strong>{marker.popUp}</strong></div>
                <div style={{ backgroundColor: "#1a237e", display: "inline-block", color: "#FFFFFF", fontSize: "8px", marginRight: "4px" }}>
                  <b>{"⠀" + marker.note + "⠀"}</b>
                </div>
                <div><p>{marker.description}</p></div>
              </Popup>
            </Marker>
          ))}

          {from?.coords && to?.coords && (
            <Polyline positions={[from.coords, to.coords]} pathOptions={{ color: "red", weight: 4 }} />
          )}
        </MapContainer>

        <div className={`absolute bottom-0 left-0 right-0 z-[1000] bg-white transition-transform duration-300
          ${from?.name && to?.name ? 'translate-y-0' : 'translate-y-full'}`}>
          {from?.name && to?.name && (
            <div className="p-4 max-h-60 overflow-y-auto">
              <div className="font-semibold mb-2">
                Comment for the route {from.name} to {to.name}
              </div>

              <div className="flex gap-2 mb-3">
                <input
                  className="flex-1 border px-2 py-1 outline-none"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                />
                <button
                  onClick={handleAddComment}
                  className="bg-blue-500 text-white px-3 rounded"
                >
                  Send
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {comments.map((c) => (
                  <div key={c.id} className="border p-2 rounded text-sm">
                    {c.text}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex justify-end p-4">
        <button
          onClick={() => navigate("/logout")}
          className="bg-indigo-500 text-white py-2 px-4 rounded-xl font-semibold hover:bg-indigo-600 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Home