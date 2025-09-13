import { naplesCoordinates } from "../constants";

export async function getLocation() {
  try {
    const res = await fetch("http://ip-api.com/json/");
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
