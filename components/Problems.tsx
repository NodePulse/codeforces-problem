"use client";

import React, { useEffect, useState } from "react";

interface ProblemProps {
  id: string;
  url: string;
  status: boolean;
}

const Problems = () => {
  const [problems, setProblems] = useState<ProblemProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProblems() {
      setLoading(true);
      const res = await fetch("/api/problems");
      const data = await res.json();
      console.log(data);
      setProblems(data?.problems);
      setLoading(false);
    }
    fetchProblems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Problem List</h1>
      {problems?.map((problem) => (
        <div key={problem.id}>
          <h2 className="text-lg font-semibold">{problem.url}</h2>
          <p>{problem.status ? "Solved" : "Not Solved"}</p>
        </div>
      ))}
    </div>
  );
};

export default Problems;
