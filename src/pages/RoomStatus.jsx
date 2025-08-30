import { useEffect, useState } from "react";
import RoomCard from "../components/RoomCard";
import roomData from "../data/rooms.json";

const RoomStatus = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("All");

  useEffect(() => {
    setRooms(roomData);
  }, []);

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.roomId
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesBuilding =
      selectedBuilding === "All" ||
      room.location.toLowerCase().includes(selectedBuilding.toLowerCase());
    return matchesSearch && matchesBuilding;
  });

  const total = filteredRooms.length;
  const empty = filteredRooms.filter((r) => r.isAvailable).length;
  const inUse = total - empty;

  return (
    <section className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">Classroom Status</h2>
      <p className="text-gray-600 mb-6">Real-Time availability</p>

      {/* Filter Options */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <input
          type="text"
          placeholder="Search by Room ID (e.g. P-205)"
          className="border px-4 py-2 rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedBuilding("All")}
            className={`px-4 py-2 rounded ${
              selectedBuilding === "All"
                ? "bg-blueTheme text-black"
                : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedBuilding("Panaroma")}
            className={`px-4 py-2 rounded ${
              selectedBuilding === "Panaroma"
                ? "bg-blueTheme text-black"
                : "bg-gray-200"
            }`}
          >
            Panaroma
          </button>
          <button
            onClick={() => setSelectedBuilding("Nexus")}
            className={`px-4 py-2 rounded ${
              selectedBuilding === "Nexus"
                ? "bg-blueTheme text-black"
                : "bg-gray-200"
            }`}
          >
            Nexus
          </button>
        </div>
      </div>

      {/* Room Count */}
      <div className="flex gap-6 text-gray-700 mb-6">
        <p>
          <strong>Total:</strong> {total}
        </p>
        <p>
          <strong>Empty:</strong> {empty}
        </p>
        <p>
          <strong>In Use:</strong> {inUse}
        </p>
      </div>

      {/* Room Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredRooms.map((room, index) => (
          <RoomCard key={index} room={room} />
        ))}
      </div>
    </section>
  );
};

export default RoomStatus;
