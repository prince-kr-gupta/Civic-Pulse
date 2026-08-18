import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";


// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});


// Move map to selected issue
function MapFocus({ issue }) {
  const map = useMap();

  const lat = issue?.lat ?? issue?.coordinates?.lat;
  const lng = issue?.lng ?? issue?.coordinates?.lng;

  useEffect(() => {
    if (lat != null && lng != null) {
      map.flyTo(
        [Number(lat), Number(lng)],
        16,
        { duration: 0.8 }
      );
    }
  }, [lat, lng, map]);

  return null;
}


function CivicMap({ issues = [], theme = "dark" }) {

  const [selectedIssue, setSelectedIssue] =
    useState(null);


  const defaultCenter = [
    24.648,
    77.315,
  ];


  const demoIssues = [
    {
      id: "CIVIC-1045",
      title: "Garbage Overflow",
      category: "Garbage",
      status: "In Progress",
      priority: "High",
      location: "Civil Lines, Guna",
      lat: 24.647,
      lng: 77.314,
    },

    {
      id: "CIVIC-1046",
      title: "Broken Streetlight",
      category: "Streetlight",
      status: "Reported",
      priority: "Medium",
      location: "JUET Main Gate",
      lat: 24.645,
      lng: 77.316,
    },

    {
      id: "CIVIC-1047",
      title: "Damaged Road",
      category: "Road",
      status: "Resolved",
      priority: "Low",
      location: "Guna Main Road",
      lat: 24.651,
      lng: 77.319,
    },
  ];


  const mapIssues =
    issues.length > 0
      ? issues
      : demoIssues;


  return (
    <main className="civic-map-page">

      {/* HEADER */}

      <div className="map-header">

        <div>

          <span className="section-label">
            CIVIC VISUALIZATION
          </span>

          <h1>
            Civic Issue Map
          </h1>

          <p>
            See reported civic problems across
            the community.
          </p>

        </div>


        <div className="map-count">

          <strong>
            {mapIssues.length}
          </strong>

          <span>
            Reported Issues
          </span>

        </div>

      </div>


      {/* MAP + SIDEBAR */}

      <div className="map-layout">

        {/* MAP */}

        <div className="google-map-container">

          <MapContainer
            center={defaultCenter}
            zoom={14}
            scrollWheelZoom={true}
            style={{
              width: "100%",
              height: "100%",
            }}
          >

            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url={
                theme === "dark"
                  ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              }
            />


            {/* Focus selected issue */}

            <MapFocus issue={selectedIssue} />


            {/* ISSUE MARKERS */}

            {mapIssues.map((issue) => {

              const lat =
                issue.lat ?? issue.coordinates?.lat;
              const lng =
                issue.lng ?? issue.coordinates?.lng;

              if (lat == null || lng == null) {
                return null;
              }

              return (
                <Marker
                  key={issue.id}
                  position={[
                    Number(lat),
                    Number(lng),
                  ]}
                  eventHandlers={{
                    click: () =>
                      setSelectedIssue(issue),
                  }}
                >

                  <Popup>

                    <div className="map-info-window">

                      <span>
                        {issue.category}
                      </span>

                      <h3>
                        {issue.title}
                      </h3>

                      <p>
                        📍 {issue.location}
                      </p>

                      <strong>
                        {issue.status}
                      </strong>

                      <small>
                        ID: {issue.id}
                      </small>

                    </div>

                  </Popup>

                </Marker>
              );
            })}

          </MapContainer>

        </div>


        {/* SIDEBAR */}

        <aside className="map-sidebar">

          <div className="map-sidebar-header">

            <span className="small-text">
              LIVE ISSUES
            </span>

            <h2>
              Reported Problems
            </h2>

          </div>


          <div className="map-issue-list">

            {mapIssues.map((issue) => (

              <button
                className={`map-issue ${
                  selectedIssue?.id === issue.id
                    ? "selected"
                    : ""
                }`}
                key={issue.id}
                onClick={() =>
                  setSelectedIssue(issue)
                }
              >

                <div className="map-issue-icon">

                  {issue.category === "Garbage"
                    ? "🗑️"
                    : issue.category === "Road"
                    ? "🛣️"
                    : issue.category === "Streetlight"
                    ? "💡"
                    : issue.category === "Water Supply"
                    ? "🚰"
                    : "⚠️"}

                </div>


                <div>

                  <strong>
                    {issue.title}
                  </strong>

                  <span>
                    📍 {issue.location}
                  </span>

                  <small>
                    {issue.status}
                  </small>

                </div>


                <span className="map-arrow">
                  →
                </span>

              </button>

            ))}

          </div>


          {/* LEGEND */}

          <div className="map-legend">

            <span className="small-text">
              STATUS
            </span>

            <div>
              <span className="legend-dot reported" />
              Reported
            </div>

            <div>
              <span className="legend-dot progress" />
              In Progress
            </div>

            <div>
              <span className="legend-dot resolved" />
              Resolved
            </div>

          </div>

        </aside>

      </div>

    </main>
  );
}


export default CivicMap;