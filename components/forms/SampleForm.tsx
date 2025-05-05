"use client";
import React, { FormEvent, useState } from "react";

export default function SampleForm() {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!username) return;
    console.log(username);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        className="font-bold"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <h1 className="flex-center">Ragul</h1>
      <button type="submit">Submit</button>
    </form>
  );
}
