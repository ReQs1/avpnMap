import { getLocation } from "@/features/map/api/get-location";
import { naplesCoordinates } from "@/shared/constants";
import { useMap } from "@vis.gl/react-maplibre";
import { useEffect } from "react";

export default function YouAreHere() {
  const { current: map } = useMap();

  useEffect(() => {
    if (!map) return;

    (async () => {
      const location = await getLocation();

      if (location && location !== naplesCoordinates) {
        map.flyTo({
          center: [location.lon, location.lat],
          zoom: 8,
          speed: 0.4,
        });
      }
    })();
  }, [map]);

  return null;
}
