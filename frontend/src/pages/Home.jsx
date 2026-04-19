import { MapContainer,TileLayer, Polygon, Marker, Popup, Polyline } from "react-leaflet"
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import pinIcon from "../assets/img/location-pin.png";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import api from "../api"
import Carousel from "../components/Carousel";
import RoutingMachine from "./RoutingMachine";
import { markers } from "../data/data_points";
import { ateneoBoundary } from "../data/data_points";

function Home() {
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
    showNotif("Error occurred while changing password", "error")
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

  const [deleteId, setDeleteId] = useState(null);

  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/comments/${deleteId}/`);
      setComments((prev) => prev.filter((c) => c.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEdit = (comment) => {
    setEditingId(comment.id);
    setEditText(comment.text);
  };

  const handleSaveEdit = async (id) => {
    try {
      const res = await api.patch(`/api/comments/${id}/`, {
        text: editText,
      });

      setComments((prev) =>
        prev.map((c) => (c.id === id ? res.data : c))
      );

      setEditingId(null);
      setEditText("");
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

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
          className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center cursor-pointer overflow-hidden ml-3 shrink-0"
          onClick={() => setShowProfile(true)}
        >
          {user?.profile_picture ? (
            <img
              src={user.profile_picture}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white font-bold">
              👤
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
            <div className="w-20 h-20 rounded-full bg-blue-300 overflow-hidden flex items-center justify-center">
                    {user?.profile_picture ? (
                <img
                  src={user.profile_picture}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-bold text-[120%]">
                  👤
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

          <Polygon positions={ateneoBoundary} pathOptions={{ color: "blue", weight: 2,fill: false }} />
          <Polygon positions={worldMask} pathOptions={{ fillColor: "grey", fillOpacity: 0.5, stroke: false }} />

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
                <div><p>{marker.description}</p></div>
              </Popup>
            </Marker>
          ))}

          {from?.coords && to?.coords && (
            <RoutingMachine coords={[from.coords, to.coords]}/>
          )}
          </MapContainer>
        </div>
      </div>

              {/* COMMENTS SECTION */}
<div className="m-4">
  {from?.name && to?.name && (
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

      {/* Add Comment Box */}
      <div className="bg-gray-50 border rounded-2xl p-4 shadow-sm mb-4">
          <div className="flex items-start gap-3">

            {/* User Profile */}
            <div className="w-10 h-10 rounded-full bg-blue-300 overflow-hidden flex items-center justify-center shrink-0">
              {user?.profile_picture ? (
                <img
                  src={user.profile_picture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>👤</span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 mb-2">
                {user?.display_name ||
                  `${user?.first_name || ""} ${user?.last_name || ""}`}
              </p>

              {/* Responsive Input + Button */}
              <div className="flex flex-col sm:flex-row gap-2">

                <input
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 bg-white w-full "
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Comment something!"
                />

                <button
                  onClick={handleAddComment}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition w-full sm:w-auto whitespace-nowrap shrink-0"
                >
                  Post
                </button>

              </div>
            </div>
          </div>
      </div>

      {/* Comments List */}
      <div className="space-y-3">
        {comments.length > 0 ? (
          comments.map((c) => (
            <div
              key={c.id}
              className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start gap-3">
                
                {/* Comment User Profile */}
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

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-800 text-sm">
                      {c.display_name || "Anonymous User"}
                    </p>

                    {c.created_at && (
                      <span className="text-xs text-gray-400">
                        {new Date(c.created_at).toLocaleDateString()}
                      </span>
                    )}

                    {c.user_id === user?.id && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => confirmDelete(c.id)}
                        className="text-red-500 text-xs"
                      >
                        Delete
                      </button>

                      <button
                        onClick={() => handleEdit(c)}
                        className="text-blue-500 text-xs"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                  </div>

                  {deleteId && (
                  <div className="fixed inset-0 flex items-center justify-center z-[3000]">
                    <div className="bg-white rounded-2xl p-6 shadow-lg w-80">
                      <h3 className="text-lg font-semibold text-gray-800">
                        Delete Comment?
                      </h3>
                      <p className="text-sm text-gray-500 mt-2">
                        This action cannot be undone.
                      </p>

                      <div className="flex justify-end gap-2 mt-4">
                        <button
                          onClick={() => setDeleteId(null)}
                          className="px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                          Cancel
                        </button>

                        <button
                          onClick={handleDelete}
                          className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                  {editingId === c.id ? (
                    <div className="mt-2">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-300"
                      />

                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleSaveEdit(c.id)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600"
                        >
                          Save
                        </button>

                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-200 px-3 py-1 rounded-lg text-xs hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 mt-1">{c.text}</p>
                  )}
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
  )}
</div>
    </div>
  )
}

export default Home