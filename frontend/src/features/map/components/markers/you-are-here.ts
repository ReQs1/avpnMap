import { getLocation } from "@/features/map/api/get-location";
import { naplesCoordinates } from "@/shared/constants";
import { useMap } from "@vis.gl/react-maplibre";
import { useEffect } from "react";

export default function YouAreHere() {
  const { current: map } = useMap();

  useEffect(() => {
    if (!map) return;

    const controller = new AbortController();

    (async () => {
      const location = await getLocation(controller.signal);

      if (location && location !== naplesCoordinates) {
        map.flyTo({
          center: [location.lon, location.lat],
          zoom: 8,
          speed: 0.4,
        });
      }
    })();

    return () => controller.abort();
  }, [map]);

  return null;
}
