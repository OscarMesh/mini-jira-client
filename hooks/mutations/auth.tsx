import { getErrorMessage } from "@/lib/utils";
import { register } from "@/services/auth-service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useRegisterMutation = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: async (response, variables) => {
      if (response.status === 201) {
        toast.success("Account created successfully");

        router.push("/auth/login");
      }
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error?.response?.data));
    },
  });

  return mutation;
};
