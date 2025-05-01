// src/store/useUserStore.js
import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axiosInstance";

const useAuthStore = create((set) => ({
  user: null,
  isCheckingAuth: true,
  loading: false,

  fetchCurrentUser: async () => {
    try {
      const res = await axiosInstance.get("/api/auth/me", { withCredentials: true });
      
      // Check the structure of the response
      if (res.data && res.data.user) {
        set({ user: res.data.user });
      } else if (res.data) {
        // If the user object is the entire response
        set({ user: res.data });
      } else {
        set({ user: null });
      }
    } catch (err) {
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  register: async ({ name, email, password, role }) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/api/auth/register", {
        name, email, password, role,
      }, { withCredentials: true });

      set({ user: { name: res.data.name, role: res.data.role }, authStatus: true });
      return true;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/api/auth/login", {
        email, password,
      }, { withCredentials: true });
      
      set({ user: { name: res.data.name, role: res.data.role } ,authStatus: true});
      return true;
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/api/auth/logout", {}, { withCredentials: true });
      set({ user: null ,authStatus: false});
      toast.success("Logged out");
    } catch (err) {
      console.error("Logout failed");
      toast.error("Logout failed");
    }
  },

  changePassword: async (data) => {
    try {
      const res = await axiosInstance.post("/api/auth/change-password", data, {
        withCredentials: true,
      });
  
      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.message || "Password changed successfully");
      }
    } catch (error) {
      console.error("Error in changing password", error);
  
      const errMsg =
        error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errMsg);
    }
  }
  
}));


export default useAuthStore;