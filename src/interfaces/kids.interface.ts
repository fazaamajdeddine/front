// src/interfaces/kids.interface.ts
import { Preferences } from "../helpers/helpers"; // Import Preferences enum

export interface KidResponse {
  _id: string;                    // Matches the MongoDB ObjectId
  name: string;                  // Kid's name
  dateOfBirth: string;           // Kid's date of birth (ISO string if serialized)
  parentId?: string;             // Optional parent ID
  establishementId?: string;     // Optional institution ID
  preferences: Preferences[];     // Array of preferences as Preferences enum
  gender: "Male" | "Female";     // Gender of the kid as an enum
  createdAt?: string;
  updatedAt?: string;
}