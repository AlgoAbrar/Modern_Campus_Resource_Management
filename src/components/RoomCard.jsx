import { CheckCircle, XCircle, MapPin, Users } from "lucide-react";

const RoomCard = ({ room }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">{room.roomId}</h3>
        {room.isAvailable ? (
          <CheckCircle className="text-green-500" />
        ) : (
          <XCircle className="text-red-500" />
        )}
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <Users size={16} />
        {room.capacity} seats
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <MapPin size={16} />
        {room.location}
      </div>
      <div className="flex gap-2">
        <button className="flex-1 bg-blueTheme text-black px-3 py-1 rounded hover:bg-blue-600">
          View Details
        </button>
        <button className="flex-1 bg-red-500 text-black px-3 py-1 rounded hover:bg-red-600">
          Report Issue
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
