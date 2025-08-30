import ComplaintForm from "../components/ComplaintForm";

const ReportProblem = () => {
  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Report a Problem
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Help us improve the classrooms by reporting any technical or facility
          issues.
        </p>
        <ComplaintForm />
      </div>
    </section>
  );
};

export default ReportProblem;
