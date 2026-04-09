import { MapContainer,TileLayer, Polygon, Marker, Popup, Polyline } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import pinIcon from "../assets/img/location-pin.png";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"
import Carousel from "../components/Carousel";

import gate1_1 from "../assets/pictures/gate1/gate1_1.png";
import gate1_2 from "../assets/pictures/gate1/gate1_2.png";
import gate1_3 from "../assets/pictures/gate1/gate1_3.png";

// import gate2_1 from "../assets/pictures/gate2/gate2_1.png";
// import gate2_2 from "../assets/pictures/gate2/gate2_2.png";
// import gate2_3 from "../assets/pictures/gate2/gate2_3.png";

// import gate3_5_1 from "../assets/pictures/gate3.5/gate3_5_1.png";
// import gate3_5_2 from "../assets/pictures/gate3.5/gate3_5_2.png";
// import gate3_5_3 from "../assets/pictures/gate3.5/gate3_5_3.png";

// import ags_1 from "../assets/pictures/ags/ags_1.png";
// import ags_2 from "../assets/pictures/ags/ags_2.png";
// import ags_3 from "../assets/pictures/ags/ags_3.png";

// import beg_1 from "../assets/pictures/beg/beg_1.png";
// import beg_2 from "../assets/pictures/beg/beg_2.png";
// import beg_3 from "../assets/pictures/beg/beg_3.png";

// import arete_1 from "../assets/pictures/arete/arete_1.png";
// import arete_2 from "../assets/pictures/arete/arete_2.png";
// import arete_3 from "../assets/pictures/arete/arete_3.png";

// import covcourt_1 from "../assets/pictures/covcourt/covcourt_1.png";
// import covcourt_2 from "../assets/pictures/covcourt/covcourt_2.png";
// import covcourt_3 from "../assets/pictures/covcourt/covcourt_3.png";

// import bel_1 from "../assets/pictures/bel/bel_1.png";
// import bel_2 from "../assets/pictures/bel/bel_2.png";
// import bel_3 from "../assets/pictures/bel/bel_3.png";

// import observatory_1 from "../assets/pictures/observatory/observatory_1.png";
// import observatory_2 from "../assets/pictures/observatory/observatory_2.png";
// import observatory_3 from "../assets/pictures/observatory/observatory_3.png";

// import leong_1 from "../assets/pictures/leong/leong_1.png";
// import leong_2 from "../assets/pictures/leong/leong_2.png";
// import leong_3 from "../assets/pictures/leong/leong_3.png";

// import xavier_1 from "../assets/pictures/xavier/xavier_1.png";
// import xavier_2 from "../assets/pictures/xavier/xavier_2.png";
// import xavier_3 from "../assets/pictures/xavier/xavier_3.png";

// import faber_1 from "../assets/pictures/faber/faber_1.png";
// import faber_2 from "../assets/pictures/faber/faber_2.png";
// import faber_3 from "../assets/pictures/faber/faber_3.png";

// import oldriz_1 from "../assets/pictures/oldriz/oldriz_1.png";
// import oldriz_2 from "../assets/pictures/oldriz/oldriz_2.png";
// import oldriz_3 from "../assets/pictures/oldriz/oldriz_3.png";

// import socsci_1 from "../assets/pictures/socsci/socsci_1.png";
// import socsci_2 from "../assets/pictures/socsci/socsci_2.png";
// import socsci_3 from "../assets/pictures/socsci/socsci_3.png";

// import kostka_1 from "../assets/pictures/kostka/kostka_1.png";
// import kostka_2 from "../assets/pictures/kostka/kostka_2.png";
// import kostka_3 from "../assets/pictures/kostka/kostka_3.png";

// import mvp_1 from "../assets/pictures/mvp/mvp_1.png";
// import mvp_2 from "../assets/pictures/mvp/mvp_2.png";
// import mvp_3 from "../assets/pictures/mvp/mvp_3.png";

// import delacosta_1 from "../assets/pictures/delacosta/delacosta_1.png";
// import delacosta_2 from "../assets/pictures/delacosta/delacosta_2.png";
// import delacosta_3 from "../assets/pictures/delacosta/delacosta_3.png";

// import newriz_1 from "../assets/pictures/newriz/newriz_1.png";
// import newriz_2 from "../assets/pictures/newriz/newriz_2.png";
// import newriz_3 from "../assets/pictures/newriz/newriz_3.png";

// import berch_1 from "../assets/pictures/berch/berch_1.png";
// import berch_2 from "../assets/pictures/berch/berch_2.png";
// import berch_3 from "../assets/pictures/berch/berch_3.png";

import faura_1 from "../assets/pictures/faura/faura_1.jpg";
import faura_2 from "../assets/pictures/faura/faura_2.jpg";
// import faura_3 from "../assets/pictures/faura/faura_3.png";

// import schmitt_1 from "../assets/pictures/schmitt/schmitt_1.png";
// import schmitt_2 from "../assets/pictures/schmitt/schmitt_2.png";
// import schmitt_3 from "../assets/pictures/schmitt/schmitt_3.png";

// import gonz_1 from "../assets/pictures/gonz/gonz_1.png";
// import gonz_2 from "../assets/pictures/gonz/gonz_2.png";
// import gonz_3 from "../assets/pictures/gonz/gonz_3.png";

// import pipac_1 from "../assets/pictures/pipac/pipac_1.png";
// import pipac_2 from "../assets/pictures/pipac/pipac_2.png";
// import pipac_3 from "../assets/pictures/pipac/pipac_3.png";

// import seca_1 from "../assets/pictures/seca/seca_1.png";
// import seca_2 from "../assets/pictures/seca/seca_2.png";
// import seca_3 from "../assets/pictures/seca/seca_3.png";

// import secb_1 from "../assets/pictures/secb/secb_1.png";
// import secb_2 from "../assets/pictures/secb/secb_2.png";
// import secb_3 from "../assets/pictures/secb/secb_3.png";

// import secc_1 from "../assets/pictures/secc/secc_1.png";
// import secc_2 from "../assets/pictures/secc/secc_2.png";
// import secc_3 from "../assets/pictures/secc/secc_3.png";

// import ctc_1 from "../assets/pictures/ctc/ctc_1.png";
// import ctc_2 from "../assets/pictures/ctc/ctc_2.png";
// import ctc_3 from "../assets/pictures/ctc/ctc_3.png";

// import som_1 from "../assets/pictures/som/som_1.png";
// import som_2 from "../assets/pictures/som/som_2.png";
// import som_3 from "../assets/pictures/som/som_3.png";

// import jsec_1 from "../assets/pictures/jsec/jsec_1.png";
// import jsec_2 from "../assets/pictures/jsec/jsec_2.png";
// import jsec_3 from "../assets/pictures/jsec/jsec_3.png";

// import macci_1 from "../assets/pictures/macci/macci_1.png";
// import macci_2 from "../assets/pictures/macci/macci_2.png";
// import macci_3 from "../assets/pictures/macci/macci_3.png";

function Home() {

  // note
  // if anyone wants to change the descriptions or anything please feel free to do so !!!
  // i mightve been hallucinating, i wrote most of these from memory
  // - cde
  
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
      // faura_3
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

      <div className="m-4 border-2 border-black-500">
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
            <Polyline
              positions={[from.coords, to.coords]}
              pathOptions={{ color: "red", weight: 4 }}
            />
          )}
        </MapContainer>
      </div>

      <div className="w-full flex justify-end p-4">
      <button
        onClick={() => navigate("/logout")}
        className="bg-indigo-500 text-white py-2 px-4 rounded-xl font-semibold
                  hover:bg-indigo-600 active:scale-95 transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Logout
      </button>
    </div>
    </div>
  )
}

export default Home