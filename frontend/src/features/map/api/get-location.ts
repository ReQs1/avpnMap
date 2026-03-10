import { naplesCoordinates } from "@/shared/constants";

export async function getLocation(signal?: AbortSignal) {
  try {
    const res = await fetch("https://ipapi.co/json/", { signal });
    const data = await res.json();
    if (
      typeof data.latitude === "number" &&
      typeof data.longitude === "number"
    ) {
      return { lat: data.latitude, lon: data.longitude };
    } else {
      return naplesCoordinates;
    }
  } catch (error) {
    console.error("Error fetching geolocation data:", error);
  }
}
