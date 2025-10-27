import PizzeriasMarkers from "@/components/map/pizzerias-markers";
import YouAreHere from "@/components/map/you-are-here";
import { pizzeriasQuery } from "@/lib/api/query-options/pizza-query-options";
import { naplesCoordinates } from "@/lib/constants";
import { createFileRoute } from "@tanstack/react-router";
import { Map } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

export const Route = createFileRoute("/(app)/map")({
  loader: (ctx) => {
    const { context } = ctx;
    context.queryClient.ensureQueryData(pizzeriasQuery);
  },
  component: MapPage,
});

function MapPage() {
  return (
    <div className="w-full">
      <Map
        initialViewState={{
          longitude: naplesCoordinates.lon,
          latitude: naplesCoordinates.lat,
          zoom: 6,
        }}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
      >
        <YouAreHere />
        <PizzeriasMarkers />
      </Map>
    </div>
  );
}
