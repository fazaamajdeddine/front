import { StateCreator, create } from "zustand";
import { AuthStatus, RegisterUser, User } from "../../interfaces";
import { devtools, persist } from "zustand/middleware";
import { AuthService } from "../../services/auth.service";
import { toast } from "sonner";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
  registerUser: (data: RegisterUser) => Promise<void>;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: "unauthorized",
  token: undefined,
  user: undefined,
  loginUser: async (email: string, password: string) => {
    try {
      const { token, user } = await AuthService.login(email, password); // This gives the correct structure from the response

      // Set the token and user in the Zustand store
      set({ status: "authorized", token, user });
      toast.success("Login successful!");
    } catch (error: any) {
      set({ status: "unauthorized", token: undefined, user: undefined });
      toast.error(error?.message || "Invalid credentials. Please try again.");
      console.log(error);
    }
  },
  logoutUser: () => {
    set({ status: "unauthorized", token: undefined, user: undefined });
    toast.success("Logged out successfully.");
  },
  registerUser: async (data: RegisterUser) => {
    try {
      const { message } = await AuthService.registerUser(data);
      toast.success(message || "Registration successful!");
    } catch (error: any) {
      toast.error(error?.message || "An error occurred during registration. Please try again.");
    }
  }
});

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      storeApi,
      { name: "auth-storage" }
    )
  )
);
