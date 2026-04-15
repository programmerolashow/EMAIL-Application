/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { db } from "@/server/db";
import { type NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data } = await req.json();
  console.log("Recieved webhook with data:", data)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unused-vars
  const emailAddress = data.email_addresses[0].email_address
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unused-vars
  const firstName = data.first_name
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unused-vars
  const lastname = data.last_name
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const imageUrl = data.image_url
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const id = data.id

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await db.user.create({
    data: {
      id: id,
      email: emailAddress,
      firstname: firstName,
      lastname: lastname,
      imageURL: imageUrl,
      time: new Date(),
    }
  })

  return new Response(`Received webhook with data: { status: 200 }`);
};