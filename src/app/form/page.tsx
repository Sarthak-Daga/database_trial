'use client'
import { useState } from "react";

export default function Form() {
  const [Name, setName] = useState("");
  const [RollNo, setRollNo] = useState("");

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!Name || !RollNo) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("/form/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Name, RollNo }),
      });

      if (response.ok) {
        alert("Data submitted successfully!");
        setName("");
        setRollNo("");
      } else {
        alert("Failed to submit data.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">User Details</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            placeholder="Enter your name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">
            Roll Number
          </label>
          <input
            id="rollNumber"
            name="rollNumber"
            type="text"
            required
            className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300"
            placeholder="Enter your roll number"
            value={RollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
