import pool from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  const { userId } = await auth(); // Make sure getAuth works with Web API Request
  console.log(userId);

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { rows } = await pool.query(
      `
  SELECT 
    p.id, 
    p.url, 
    COALESCE(ups.status, FALSE) AS status 
  FROM problems p 
  LEFT JOIN user_problem_status ups 
    ON p.id = ups.problem_id AND ups.user_id = $1
  `,
      [userId]
    );
    return NextResponse.json({ problems: rows }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const POST = async (req: Request) => {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" });
  }

  const { problemId, status } = await req.json();

  try {
    await pool.query(
      `INSERT INTO user_problem_status (user_id, problem_id, status) VALUES ($1, $2, $3)
         ON CONFLICT (user_id, problem_id) DO UPDATE SET status = EXCLUDED:status`,
      [userId, problemId, status]
    );

    return NextResponse.json({ message: "Problem added" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
};
