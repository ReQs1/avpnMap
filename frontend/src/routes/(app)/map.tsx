import YouAreHere from "@/components/header/map/you-are-here";
import { naplesCoordinates } from "@/lib/constants";
import { createFileRoute } from "@tanstack/react-router";
import { Map } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export const Route = createFileRoute("/(app)/map")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full">
      <Map
        initialViewState={{
          longitude: naplesCoordinates.lon,
          latitude: naplesCoordinates.lat,
          zoom: 8,
        }}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
      >
        <YouAreHere />
      </Map>
    </div>
  );
}
