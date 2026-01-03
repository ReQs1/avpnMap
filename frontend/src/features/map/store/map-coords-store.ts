import { naplesCoordinates } from "@/shared/constants";
import { create } from "zustand";

type MapCoordsState = {
  longitude: number;
  latitude: number;
  zoom: number;
  hasUserMoved: boolean;
  setCoords: (longitude: number, latitude: number, zoom: number) => void;
};

const DEFAULT_ZOOM = 6;

export const useMapCoordsStore = create<MapCoordsState>((set) => ({
  longitude: naplesCoordinates.lon,
  latitude: naplesCoordinates.lat,
  zoom: DEFAULT_ZOOM,
  hasUserMoved: false,
  setCoords: (longitude, latitude, zoom) =>
    set({
      longitude,
      latitude,
      zoom,
      hasUserMoved: true,
    }),
}));
