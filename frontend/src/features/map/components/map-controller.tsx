import { useMap } from "@vis.gl/react-maplibre";
import { useEffect } from "react";

export default function MapController() {
  const { current: map } = useMap();

  useEffect(() => {
    if (!map) return;
    const ml = map.getMap();

    if (ml.touchZoomRotate) {
      ml.touchZoomRotate.disableRotation();
    }
  }, [map]);

  return null;
}
