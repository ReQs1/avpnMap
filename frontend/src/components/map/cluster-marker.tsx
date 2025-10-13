import { Marker } from "@vis.gl/react-maplibre";

interface ClusterMarkerProps {
  latitude: number;
  longitude: number;
  pointCount: number;
  onClick: () => void;
}

function ClusterMarker({
  latitude,
  longitude,
  pointCount,
  onClick,
}: ClusterMarkerProps) {
  return (
    <Marker latitude={latitude} longitude={longitude} onClick={onClick}>
      <div
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-transform hover:scale-110"
        style={{
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        {pointCount}
      </div>
    </Marker>
  );
}

export default ClusterMarker;
