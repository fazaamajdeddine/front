import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import { KidResponse } from "../../interfaces"; // Update the path as needed
import { KidService } from "../../services/kids.service";
import { toast } from "sonner";
import { useAuthStore } from "../auth/auth.store"; // Import the auth store

export interface KidsState {
  kids: KidResponse[];
  kid?: KidResponse;
  getAllKids: () => void;
  getKid: (id: string) => void;
  createKid: (kid: KidResponse) => void;
  deleteKid: (id: string) => void;
  updateKid: (id: string, kid: KidResponse) => void;
}

const storeApi: StateCreator<KidsState> = (set) => ({
  kids: [],
  kid: undefined,

  // Fetch all kids, optionally filtering by institutionId
  getAllKids: async () => {

    const userId = useAuthStore.getState().user?._id; // Get the current user ID from the auth store

    if (!userId) {

      toast.error("User  not authenticated.");

      return;

    }

    try {

      const res = await KidService.getAllKids(userId); // Pass the userId to filter kids

      set({ kids: res });

    } catch (error) {

      toast.error("Error fetching kids.");

      throw new Error("Error fetching kids.");

    }

  },

  // Fetch a specific kid by ID
  getKid: async (id: string) => {
    try {
      const res = await KidService.getKid(id);
      set({ kid: res });
    } catch (error) {
      toast.error("Error fetching the kid.");
      throw new Error("Error fetching the kid.");
    }
  },

  // Create a new kid
  createKid: async (kid: KidResponse) => {
    try {
      const userId = useAuthStore.getState().user?._id; // Get the current user ID from the auth store
      const res = await KidService.createKid({ ...kid, parentId: userId }); // Pass the parentId
      set((state) => ({
        kids: [...state.kids, res],
      }));
      toast.success("Kid created successfully!");
    } catch (error) {
      toast.error("Error creating the kid.");
      throw new Error("Error creating the kid.");
    }
  },

  // Delete a kid by ID
  deleteKid: async (id: string) => {
    try {
      await KidService.deleteKid(id);
      set((state) => ({
        kids: state.kids.filter((kid) => kid.zid !== id),
      }));
      toast.success("Kid deleted successfully!");
    } catch (error) {
      toast.error("Error deleting the kid.");
      throw new Error("Error deleting the kid.");
    }
  },

  // Update a specific kid
  updateKid: async (id: string, kid: KidResponse) => {
    try {
      const res = await KidService.updateKid(id, kid);
      set((state) => ({
        kids: state.kids.map((k) => (k.zid === id ? res : k)),
        kid: res,
      }));
      toast.success("Kid updated successfully!");
    } catch (error) {
      toast.error("Error updating the kid.");
      throw new Error("Error updating the kid.");
    }
  },
});

export const useKidsStore = create<KidsState>()(
  devtools(storeApi)
);
