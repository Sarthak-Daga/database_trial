"use client";
import { useState } from "react";

export default function Delete() {
  const [Name, setName] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!Name) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("/delete/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Name }),
      });

      if (response.ok) {
        setIsUpdated(true); // Set update flag to true
        setTimeout(() => setIsUpdated(false), 600); // Reset flag after 0.6 seconds
        alert("Deleted")
        setName("");
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
        <h1 className="text-2xl font-bold mb-6 text-center">Delete User</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
        {isUpdated && (
            <div className="text-red-600 font-medium text-center">
              Deleted!
            </div>
          )}
          <div>
            <label
              htmlFor="Name"
              className="block text-sm font-medium text-gray-700"
            >
              Enter the Name of the user you want to delete
            </label>
            <input
              type="text"
              id="Name"
              name="Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Enter username"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
