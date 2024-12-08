export interface KidResponse {
  _id: string;                    // Matches the MongoDB ObjectId
  name: string;                  // Kid's name
  dateOfBirth: string;           // Kid's date of birth (ISO string if serialized)
  parentId?: string;             // Optional parent ID
  institutionId?: string;        // Optional institution ID
  preferences: string[];         // Array of preferences as strings
  gender: "Male" | "Female";     // Gender of the kid as an enum
  createdAt?: string;
  updatedAt?: string;
}
