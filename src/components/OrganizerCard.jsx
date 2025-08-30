import { AlertTriangle, CheckCircle } from "lucide-react";

const OrganizerCard = ({ room }) => {
  const hasIssues = room.issues.length > 0;

  return (
    <div className="p-4 rounded-lg shadow bg-white hover:shadow-md transition">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">{room.roomId}</h3>
        {hasIssues ? (
          <AlertTriangle className="text-red-500" />
        ) : (
          <CheckCircle className="text-green-500" />
        )}
      </div>
      <p className="text-gray-600 mb-2">
        {hasIssues
          ? `${room.issues.length} issue(s) reported`
          : "All equipment OK"}
      </p>
      {hasIssues && (
        <ul className="text-sm text-gray-500 list-disc pl-5">
          {room.issues.slice(0, 2).map((issue, idx) => (
            <li key={idx}>{issue}</li>
          ))}
          {room.issues.length > 2 && <li>+ more</li>}
        </ul>
      )}
    </div>
  );
};

export default OrganizerCard;
