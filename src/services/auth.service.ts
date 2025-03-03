// src/services/auth.service.ts
import { auth } from "../api/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../api/firebaseConfig"; // Import Firestore
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { LoginResponse, RegisterUser } from "../interfaces";

export class AuthService {
    static login = async (email: string, password: string): Promise<LoginResponse> => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            return {
                status: 200,
                message: "Login successful",
                token: user.uid, // Use UID as token
                user: {
                    _id: user.uid,
                    firstName: "", // Fetch additional user info from Firestore if needed
                    lastName: "",
                    email: user.email || "",
                    role: "", // Set role based on your logic
                },
            };
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message); // Ensure type safety for error messages
            }
            throw new Error("An unexpected error occurred");
        }
    };

    static registerUser = async (data: RegisterUser): Promise<{ message: string }> => {
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;

            // Store additional user info in Firestore
            const userDocRef = doc(db, "users", user.uid); // Create a document reference for the user
            await setDoc(userDocRef, {
                firstName: data.firstName,
                lastName: data.lastName,
                role: data.role,
                email: data.email,
            });

            return { message: "Registration successful!" };
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message); // Ensure type safety for error messages
            }
            throw new Error("An unexpected error occurred");
        }
    };
}
