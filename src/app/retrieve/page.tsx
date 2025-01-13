"use client";

import { useState } from "react";

export default function FormPage() {
  const [Name, setName] = useState("");
  const [RollNo, setRollNo] = useState<number | null>(null); // For retrieved RollNo
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Reset error state
    setRollNo(null); // Reset RollNo state

    if (!Name) {
      alert("Please provide a name.");
      return;
    }

    try {
      const response = await fetch("/retrieve/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Name }),
      });

      if (response.ok) {
        const data = await response.json();
        setRollNo(data.data?.RollNo || null); // Update RollNo from response

        setName(""); // Clear input field
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to fetch data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while retrieving data.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Form Page</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your name"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
        Your RollNo. : {RollNo}
      </div>
    </div>
  )
}
