import { Building, Monitor, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <section className="text-center py-16 px-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Know Which CSE Classrooms Are Available
      </h1>
      <p className="text-gray-600 max-w-xl mx-auto mb-8">
        Real-Time room availability, quick organizer check, and anonymous
        problem reporting for the CSE department.
      </p>

      <div className="flex justify-center gap-6 mb-12">
        <button
          onClick={() => navigate("/room-status")}
          className="bg-blueTheme text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Check Room Availability
        </button>
        <button
          onClick={() => navigate("/report-problem")}
          className="bg-purpleTheme text-white px-6 py-2 rounded-md hover:bg-purple-600"
        >
          Report a Problem
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto mt-10">
        <div className="flex flex-col items-center">
          <Building size={40} className="text-blueTheme mb-2" />
          <span>Room Status</span>
        </div>
        <div className="flex flex-col items-center">
          <Monitor size={40} className="text-purpleTheme mb-2" />
          <span>Equipment Check</span>
        </div>
        <div className="flex flex-col items-center">
          <AlertCircle size={40} className="text-red-500 mb-2" />
          <span>Report Problem</span>
        </div>
      </div>
    </section>
  );
};

export default Home;
