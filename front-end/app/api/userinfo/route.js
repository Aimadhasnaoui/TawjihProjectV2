import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const user = cookieStore.get("user");

  return Response.json({
    user: user ? JSON.parse(user.value) : null,
  });
}