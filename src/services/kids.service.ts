import { AxiosError } from "axios";
import { configApi } from "../api/configApi"; // Use the `kidsApi` instance
import { KidResponse } from "../interfaces";

export class KidService {
  static getAllKids = async (): Promise<KidResponse[]> => {
    try {
      const { data } = await configApi.get<{ status: number; message: string; data: KidResponse[] }>("/kids/get-kids");
      console.log(data);
      return data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("🐞🐞🐞🐞🐞🐞🐞🐞🐞", error.response?.data);
        throw new Error(error.response?.data);
      }
      console.log(error);
      throw new Error("Error fetching kids");
    }
  };

  static getKid = async (id: string): Promise<KidResponse> => {
    try {
      const { data } = await configApi.get<KidResponse>(`/kids/kids/${id}`);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
        throw new Error(error.response?.data.message || "Error fetching kid");
      }
      console.error(error);
      throw new Error("Error fetching kid");
    }
  };

  static createKid = async (kid: Partial<KidResponse>): Promise<KidResponse> => {
    try {
      const { data } = await configApi.post<KidResponse>("/kids/add", kid);
      console.log(data);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
        throw new Error(error.response?.data.message || "Error creating kid");
      }
      console.error(error);
      throw new Error("Error creating kid");
    }
  };

  static updateKid = async (
    id: string,
    kid: Partial<KidResponse>
  ): Promise<KidResponse> => {
    try {
      const { data } = await configApi.put<KidResponse>(`/kids/update/${id}`, kid);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
        throw new Error(error.response?.data.message || "Error updating kid");
      }
      console.error(error);
      throw new Error("Error updating kid");
    }
  };

  static deleteKid = async (id: string): Promise<void> => {
    try {
      await configApi.delete(`/kids/delete/${id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
        throw new Error(error.response?.data.message || "Error deleting kid");
      }
      console.error(error);
      throw new Error("Error deleting kid");
    }
  };
}
