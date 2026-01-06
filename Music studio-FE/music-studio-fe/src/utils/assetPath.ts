// Utility function to get correct asset path for GitHub Pages
export const getAssetPath = (path: string): string => {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    // In production (GitHub Pages), use the base URL
    // In development, just use the path as-is
    return import.meta.env.BASE_URL + cleanPath;
};
