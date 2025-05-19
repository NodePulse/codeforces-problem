"use client";

import { cn, format } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ExternalLinkIcon } from "lucide-react";

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

  const toggleStatus = async (problemId: string, currentStatus: boolean) => {
    await fetch("/api/problems", {
      method: "POST",
      body: JSON.stringify({
        problemId,
        status: !currentStatus,
      }),
    });
    setProblems((prev) =>
      prev.map((problem) =>
        problem.id === problemId
          ? { ...problem, status: !problem.status }
          : problem
      )
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Problem List</h1>
      <div className="flex flex-wrap gap-4">
        {problems?.map((problem) => (
          <Card
            key={problem.id}
            className="min-w-[180px] hover:shadow-[1px_1px_5px_rgba(0,0,0,0.3)]"
          >
            <CardHeader>
              <CardTitle className="text-lg flex justify-center">
                {format(problem.id)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                href={problem.url}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:cursor-default flex items-center gap-1 justify-center"
              >
                <ExternalLinkIcon className="h-4 w-4" />
                <span>{problem.id}</span>
              </Link>
            </CardContent>
            <CardFooter className="flex justify-center">
              <button
                onClick={() => toggleStatus(problem.id, problem.status)}
                className={cn(
                  "px-4 py-2 rounded hover:cursor-pointer",
                  problem.status
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                )}
              >
                {problem.status ? "Solved" : "Not Solved"}
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Problems;
