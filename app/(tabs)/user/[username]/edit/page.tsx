import db from "@/lib/db";
import EditUserForm from "@/components/edit-user";

type PageProps = {
  params: {
    username: string;
  };
};

export default async function EditUser({ params }: PageProps) {
  const user = await db.user.findUnique({
    where: {
      username: params.username,
    },
  });
  return <EditUserForm user={user} />;
}
