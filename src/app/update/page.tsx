"use client";
import { useState } from "react";

export default function Update() {
  const [Name, setName] = useState("");
  const [RollNo, setRollNo] = useState("");
  const [isUpdated, setIsUpdated] = useState(false); // Track if update was successful

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!Name || !RollNo) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("/update/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Name, RollNo }),
      });

      if (response.ok) {
        setIsUpdated(true); // Set update flag to true
        setTimeout(() => setIsUpdated(false), 500); // Reset flag after 3 seconds
        setName("");
        setRollNo("");
      } else {
        alert("Failed to update data.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Update Roll Number</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Show "Updated!" message */}
          {isUpdated && (
            <div className="text-green-600 font-medium text-center">
              Updated!
            </div>
          )}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label
              htmlFor="roll"
              className="block text-sm font-medium text-gray-700"
            >
              New Roll Number
            </label>
            <input
              type="number"
              id="roll"
              name="roll"
              value={RollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter the new roll number"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
