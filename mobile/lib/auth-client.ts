import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
 
export const authClient = createAuthClient({
    baseURL: process.env.EXPO_PUBLIC_BACKEND_URL, 
    plugins: [
        expoClient({
            scheme: process.env.EXPO_PUBLIC_SCHEMA,
            storagePrefix: process.env.EXPO_PUBLIC_SCHEMA,
            // Aqui está o pulo do gato: se for web, não usa o SecureStore
            storage: Platform.OS === 'web' ? undefined : SecureStore,
        })
    ]
});