'use client';

import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [result, setResult] = useState('');

  const generateResume = async () => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ name, skills }),
    });

    const data = await res.json();
    setResult(data.text);
  };

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        AI Resume Builder 🚀
      </h1>

      <div className="mt-6 flex flex-col gap-4">
        <input
          placeholder="Enter your name"
          className="border p-2"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Enter your skills"
          className="border p-2"
          onChange={(e) => setSkills(e.target.value)}
        />

        <button
          onClick={generateResume}
          className="bg-black text-white p-2 rounded"
        >
          Generate Resume
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Result:</h2>
        <p>{result}</p>
      </div>
    </main>
  );
}
