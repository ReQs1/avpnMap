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
    <Marker latitude={latitude} longitude={longitude}>
      <button
        onClick={onClick}
        aria-label={`Cluster of ${pointCount} pizzerias`}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        style={{ fontSize: "12px", fontWeight: "bold" }}
      >
        {pointCount}
      </button>
    </Marker>
  );
}

export default ClusterMarker;
