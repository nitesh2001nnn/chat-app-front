import { API_CONFIG } from "../api-config/api-config";

export function getLocalStorageObjDetails(key: string) {
    if (key.indexOf(".") > -1) {
        const keys = key.split('.');
        console.log("what is here", JSON.parse(localStorage.getItem(keys[0]) || '{}')[keys[1]])
        return JSON.parse(localStorage.getItem(keys[0]) || '{}')[keys[1]]
    } else {
        return localStorage.getItem(key);
    }
}

/**
 * Safely resolves a backend image path to a full URL.
 * Returns undefined if path is missing, null, or undefined to prevent invalid requests like /undefined.
 */
export function getProfileImageUrl(photoPath?: string | null): string | undefined {
    if (!photoPath || photoPath === "undefined" || photoPath === "null") {
        return undefined;
    }
    if (photoPath.startsWith("http://") || photoPath.startsWith("https://") || photoPath.startsWith("blob:")) {
        return photoPath;
    }
    const cleanPath = photoPath.startsWith("/") ? photoPath.slice(1) : photoPath;
    return `${API_CONFIG.BaseUrl}/${cleanPath}`;
}

