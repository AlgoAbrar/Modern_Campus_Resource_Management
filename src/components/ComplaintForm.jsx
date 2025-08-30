import { useState } from "react";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    roomNumber: "",
    category: "",
    description: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send to backend instead
    console.log("Submitted:", formData);
    setSuccess(true);

    // Reset form
    setFormData({ roomNumber: "", category: "", description: "" });

    // Hide success after 3s
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h3 className="text-xl font-bold mb-2">Report a Problem</h3>

      {success && (
        <div className="p-3 bg-green-100 text-green-800 rounded-md">
          Issue reported successfully!
        </div>
      )}

      <div>
        <label className="block font-medium mb-1">Select Room Number</label>
        <select
          name="roomNumber"
          value={formData.roomNumber}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">-- Choose a room --</option>
          <option value="P-205">P-205</option>
          <option value="P-303">P-303</option>
          <option value="N-101">N-101</option>
          <option value="N-210">N-210</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Issue Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">-- Select a category --</option>
          <option value="Projector">Projector Issue</option>
          <option value="Internet">Internet Issue</option>
          <option value="Furniture">Furniture Damage</option>
          <option value="Electricity">Electricity Problem</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Describe the Issue</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
          placeholder="Write a short description..."
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-purpleTheme text-black px-6 py-2 rounded hover:bg-purple-700"
      >
        Submit Report
      </button>
    </form>
  );
};

export default ComplaintForm;
