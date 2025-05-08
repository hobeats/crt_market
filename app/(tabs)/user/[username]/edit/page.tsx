import db from "@/lib/db";
import EditUserForm from "@/components/edit-user";

export default async function Edituser({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await db.user.findUnique({
    where: {
      username,
    },
  });
  return <EditUserForm user={user} />;
}
