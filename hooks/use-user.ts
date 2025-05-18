import { useSession } from "next-auth/react";

export const useUser = () => {
  const { data: session, update } = useSession();
  const loggedUser = session?.user;

  return {
    session,
    loggedUser,
    update,
  };
};
