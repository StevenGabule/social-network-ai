import { authService, SocialProvider } from "@/api/auth-service";
import { useAuthStore } from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "./use-toast-store";

export const useSocialAuth = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  // Mutation for getting the social auth URL
  const socialAuthUrlMutation = useMutation({
    mutationFn: (provider: SocialProvider) =>
      authService.getSocialAuthUrl(provider),
    onSuccess: (response) => {
      window.location.href = response.data.url;
    },
    onError: (error) => {
      toast.error(`Failed  to initiate social login.`, error.message);
    },
  });

  // Mutation for handling the callback
  const socialCallbackMutation = useMutation({
    mutationFn: async (token: string) => await authService.handleSocialCallback(token),
    onSuccess: async () => {
      try {
        const token = localStorage.getItem("access_token") || "";
				
        const response = await authService.getProfile();
        const user = response.data.data;

        setAuth(user, token); // Minimal placeholder data
        navigate("/dashboard");
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Failed to complete social login`, error.message);
          toast.error("Login successful, but failed to fetch profile.");
          navigate("/dashboard");
        }
      }
    },
    onError: (error) => {
      toast.error("Failed to complete social login", error.message);
      navigate("/login");
    },
  });

  return {
    initiateLogin: (provider: SocialProvider) => socialAuthUrlMutation.mutate(provider),
    handleCallback: async (token: string) => await socialCallbackMutation.mutate(token),
    isLoading:
      socialAuthUrlMutation.isPending || socialCallbackMutation.isPending,
    error: socialAuthUrlMutation.error || socialCallbackMutation.error,
  };
};
