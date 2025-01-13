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
      const response = await fetch("/form/api", {
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
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <p>Name: {Name}</p>
      {RollNo !== null ? (
        <p>RollNo of the Name: {RollNo}</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <p>Submit a name to see the RollNo.</p>
      )}
    </div>
  );
}
