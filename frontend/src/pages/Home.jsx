import { MapContainer,TileLayer, Polygon, Marker, Popup, Polyline } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import pinIcon from "../assets/img/location-pin.png";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import api from "../api"


function Home() {

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

  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [activeInput, setActiveInput] = useState(null);
  const inputContainerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMarkers, setFilteredMarkers] = useState(markers);
  const [showProfile, setShowProfile] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [notif, setNotif] = useState(null)
  const location = useLocation()
  const [showEditName, setShowEditName] = useState(false)
  const [displayName, setDisplayName] = useState("")
  const [showUpload, setShowUpload] = useState(false);
  const fileInputRef = useRef(null);

  const [profileFile, setProfileFile] = useState(null);

  const handleUploadPfp = async () => {
  if (!profileFile) return;

  const formData = new FormData();
    formData.append("profile_picture", profileFile);

    try {
      const res = await api.patch("/accounts/profile/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(res.data);
      showNotif("Profile picture updated", "success");
      setShowUpload(false);
      setProfileFile(null);
    } catch (err) {
      console.error(err.response?.data || err);
      showNotif("Upload failed", "error");
    }
  };
  useEffect(() => {
    if (location.state?.message) {
      showNotif(location.state.message, "success")
    }
  }, [location.state])

    const handleChangeDisplayName = async () => {
    try {
      const res = await api.patch("/accounts/profile/", {
        display_name: displayName,
      })

      setUser(res.data) // update UI
      showNotif("Display name updated", "success")
      setShowEditName(false)

    } catch (err) {
      console.error(err)
      showNotif("Failed to update display name", "error")
    }
  }

  const showNotif = (message, type = "success") => {
    setNotif({ message, type })
    setTimeout(() => {
      setNotif(null)
    }, 3000)
  }

  const handleChangePassword = async () => {
  if (newPassword !== confirmPassword) {
    showNotif("Passwords do not match", "error")
    return
  }

  try {
    const res = await api.post("/accounts/change-password/", {
      old_password: oldPassword,
      new_password: newPassword,
    })

    showNotif("Password changed", "success")

    // reset fields
    setOldPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setShowChangePassword(false)

  } catch (err) {
    console.error(err)
    showNotif("Error occurred while changine password", "error")
  }
}

  {/* get profile */}
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/accounts/profile/")
        setUser(res.data)
        console.log(res.data)
      } catch (err) {
        console.error("Failed to fetch profile:", err)
      }
    }

    fetchProfile()
  }, [])

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
    <div className="h-screen w-full flex flex-col">

      {notif && (
        <div className="fixed top-5 right-5 z-[3000]">
          <div
            className={`px-5 py-3 rounded-xl shadow-lg text-white font-medium
            ${notif.type === "success" ? "bg-green-500" : "bg-red-500"}`}
          >
            {notif.message}
          </div>
        </div>
      )}

      <div className="fixed top-0 left-0 w-full bg-blue-800 shadow-md z-[1500] px-4 py-3 flex items-start justify-between">

      {/* LEFT: From + To */}
      <div className="flex flex-col gap-1">
        <h1
          className="absolute inset-0 flex items-center justify-center text-white opacity-80 pointer-events-none select-none"
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

      {/* RIGHT: Profile */}
      <div
        className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center cursor-pointer overflow-hidden ml-3 shrink-0"
        onClick={() => setShowProfile(true)}
      >
        {user?.profile_picture ? (
          <img
            src={user.profile_picture}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white font-bold">
            {user?.first_name?.[0] || "U"}
          </span>
        )}
      </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-0 transform transition-transform duration-300 z-[2000]
        ${showProfile ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-5 space-y-4">

          <button onClick={() => setShowProfile(false)}>✕</button>

          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
                    {user?.profile_picture ? (
                <img
                  src={user.profile_picture}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-bold text-[120%]">
                  {user?.first_name?.[0] || "U"}
                </span>
              )}
            </div>

            <h2 className="text-lg font-semibold">
              {user?.display_name || `${user?.first_name} ${user?.last_name}`}
            </h2>

            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          <div className="space-y-2">

            {!showUpload ? (
                <button
                  onClick={() => setShowUpload(true)}
                  className="w-full bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
                >
                  Upload Profile Picture
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setShowUpload(false);
                      setProfileFile(null);
                    }}
                    className="w-full bg-gray-100 p-2 rounded hover:bg-gray-200"
                  >
                    Upload Profile Picture
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfileFile(e.target.files[0])}
                    className="hidden"
                  />

                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="w-full bg-yellow-100 p-2 rounded-lg hover:bg-yellow-200"
                  >
                    Choose Image
                  </button>

                  {profileFile && (
                    <p className="text-sm text-gray-500">
                      Selected: {profileFile.name}
                    </p>
                  )}

                  <button
                    onClick={handleUploadPfp}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    Confirm
                  </button>
                </div>
            )}

            <button
              onClick={() => setShowChangePassword(prev => !prev)}
              className="w-full bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
            >
              Change Password
            </button>

            {showChangePassword && (
              <div className="space-y-2">
                <input
                  type="password"
                  placeholder="Old Password"
                  className="w-full p-2 border rounded"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full p-2 border rounded"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full p-2 border rounded"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                  onClick={handleChangePassword}
                  className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            )}

            <button
              onClick={() => {
                setShowEditName(prev => !prev)
                setDisplayName(user?.display_name || "")
              }}
              className="w-full bg-gray-100 p-2 rounded-lg hover:bg-gray-200"
            >
              Edit Display Name
            </button>

            {showEditName && (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="New Display Name"
                  className="w-full p-2 border rounded"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />

                <button
                  onClick={handleChangeDisplayName}
                  className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            )}

            <button
              onClick={() => navigate("/logout")}
              className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>

        </div>
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
                <Popup>{marker.popUp}</Popup>
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
      </div>
    </div>
  )
}

export default Home