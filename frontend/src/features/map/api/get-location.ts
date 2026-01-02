import { naplesCoordinates } from "@/shared/constants";

export async function getLocation(signal?: AbortSignal) {
  try {
    const res = await fetch("http://ip-api.com/json/", { signal });
    const data = await res.json();
    if (typeof data.lat === "number" && typeof data.lon === "number") {
      return { lat: data.lat, lon: data.lon };
    } else {
      return naplesCoordinates;
    }
  } catch (error) {
    console.error("Error fetching geolocation data:", error);
  }
}
