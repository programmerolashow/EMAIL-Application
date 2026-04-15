import { type NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = await req.json();
  console.log("Recieved webhook with data:", data)

  return new Response(`Received webhook with data: { status: 200, message: "Success"}`);
};