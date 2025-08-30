import { useEffect, useState } from "react";
import OrganizerCard from "../components/OrganizerCard";
import organizerData from "../data/organizer.json";

const Organizer = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    setRooms(organizerData);
  }, []);

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-center">
          Classroom Organizer
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Quickly see whether essential classroom equipment is working properly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room, idx) => (
            <OrganizerCard key={idx} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Organizer;
