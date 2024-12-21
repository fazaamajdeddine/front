// src/services/kids.service.ts
import { db } from "../api/firebaseConfig";
import { collection, getDocs, doc, setDoc, deleteDoc, getDoc, query, where } from "firebase/firestore";
import { KidResponse } from "../interfaces";

export class KidService {
    // Get all kids
    static getAllKids = async (userId: string): Promise<KidResponse[]> => {

        try {

            const kidsCollection = collection(db, "kids");

            const q = query(kidsCollection, where("parentId", "==", userId)); // Filter by parentId

            const kidsSnapshot = await getDocs(q);

            return kidsSnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() } as KidResponse));

        } catch (error: unknown) {

            throw new Error("Failed to fetch kids: " + (error instanceof Error ? error.message : "Unknown error"));

        }

    };

    // Get a single kid by ID
    static getKid = async (id: string): Promise<KidResponse> => {
        try {
            const kidDoc = doc(db, "kids", id);
            const kidSnapshot = await getDoc(kidDoc);
            if (kidSnapshot.exists()) {
                return { _id: kidSnapshot.id, ...kidSnapshot.data() } as KidResponse;
            } else {
                throw new Error("Kid not found");
            }
        } catch (error: unknown) {
            throw new Error("Failed to fetch kid: " + (error instanceof Error ? error.message : "Unknown error"));
        }
    };

    // Create a new kid
    static createKid = async (kid: Partial<KidResponse>): Promise<KidResponse> => {
        try {
            // Validate required fields
            if (!kid.name || !kid.dateOfBirth || !kid.gender || (!kid.parentId && !kid.establishementId)) {
                throw new Error("Missing required fields: name, dateOfBirth, gender, and either parentId or establishementId");
            }
            if (kid.gender !== "Male" && kid.gender !== "Female") {
                throw new Error("Invalid gender value. Must be 'Male' or 'Female'");
            }

            // Ensure preferences is an array
            kid.preferences = kid.preferences || [];

            const newKidRef = doc(collection(db, "kids"));
            await setDoc(newKidRef, kid);
            return { _id: newKidRef.id, ...kid } as KidResponse;
        } catch (error: unknown) {
            throw new Error("Failed to create kid: " + (error instanceof Error ? error.message : "Unknown error"));
        }
    };

    // Update an existing kid
    static updateKid = async (id: string, kid: Partial<KidResponse>): Promise<KidResponse> => {
        try {
            const kidDoc = doc(db, "kids", id);
            await setDoc(kidDoc, kid, { merge: true }); // Merge fields instead of overwriting
            return { _id: id, ...kid } as KidResponse;
        } catch (error: unknown) {
            throw new Error("Failed to update kid: " + (error instanceof Error ? error.message : "Unknown error"));
        }
    };

    // Delete a kid by ID
    static deleteKid = async (id: string): Promise<void> => {
        try {
            const kidDoc = doc(db, "kids", id);
            await deleteDoc(kidDoc);
        } catch (error: unknown) {
            throw new Error("Failed to delete kid: " + (error instanceof Error ? error.message : "Unknown error"));
        }
    };
}
