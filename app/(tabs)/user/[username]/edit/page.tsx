import db from "@/lib/db";
import EditUserForm from "@/components/edit-user";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const user = await db.user.findUnique({
    where: {
      username: params.username,
    },
  });
  return <EditUserForm user={user} />;
}
