import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";
import toast from "react-hot-toast";

const useDeviceStore = create((set) => ({
  devices: [],
  loading: false,

  // Fetch all devices (for dashboard)
  fetchDevices: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get("/api/device", {
        withCredentials: true,
      });
      set({ devices: res.data, loading: false });
    } catch (err) {
      set({ loading: false });
      toast.error("Failed to fetch devices");
    }
  },

  // Register new device (manufacturer)
  registerDevice: async (serial) => {
    try {
      toast.loading("Registering device...");
      const res = await axiosInstance.post(
        "/api/device/register",
        { serial },
        { withCredentials: true }
      );
      toast.dismiss();
      toast.success("Device registered on blockchain!");
  
      // Fetch updated user-specific device list
      await useDeviceStore.getState().fetchUserDevices();
  
      return res.data;
    } catch (err) {
      toast.dismiss();
      toast.error(err?.response?.data?.error || "Device registration failed");
    }
  },
  

  // Ship device (shipper)
  shipDevice: async (serial) => {
    try {
      toast.loading("Shipping device...");
      const res = await axiosInstance.post(
        "/api/device/ship",
        { serial },
        { withCredentials: true }
      );
      toast.dismiss();
      toast.success("Device marked as shipped!");

      // Refetch devices
      await useDeviceStore.getState().fetchDevices();
      return res.data;
    } catch (err) {
      toast.dismiss();
      toast.error(err?.response?.data?.error || "Shipping failed");
    }
  },

  // Activate device (customer)
  activateDevice: async (serial) => {
    try {
      toast.loading("Activating device...");
      const res = await axiosInstance.post(
        "/api/device/activate",
        { serial },
        { withCredentials: true }
      );
      toast.dismiss();
      toast.success("Device activated!");

      // Refetch devices
      await useDeviceStore.getState().fetchDevices();
      return res.data;
    } catch (err) {
      toast.dismiss();
      toast.error(err?.response?.data?.error || "Activation failed");
    }
  },

  // Get device by serial (optional, e.g., for QR code scan)
  getDeviceBySerial: async (serial) => {
    try {
      const res = await axiosInstance.get(`/api/device/${serial}`);
      return res.data;
    } catch (err) {
      toast.error("Device not found");
    }
  },

   // Fetch devices for current user (based on role)
   fetchUserDevices: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.get("/api/device/", {
        withCredentials: true,
      });
      set({ devices: res.data, loading: false });
    } catch (err) {
      set({ loading: false });
      toast.error("Failed to fetch user devices");
    }
  },
}));

export default useDeviceStore;
