import PizzeriasMarkers from "@/features/map/components/markers/pizzerias-markers";
import YouAreHere from "@/features/map/components/markers/you-are-here";
import { pizzeriasQuery } from "@/features/map/api/pizza-query-options";
import { createFileRoute } from "@tanstack/react-router";
import { Map } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useMapCoordsStore } from "@/features/map/store/map-coords-store";

export const Route = createFileRoute("/(app)/map")({
  loader: (ctx) => {
    const { context } = ctx;
    context.queryClient.ensureQueryData(pizzeriasQuery);
  },
  component: MapPage,
});

function MapPage() {
  const { latitude, longitude, zoom, setCoords, hasUserMoved } =
    useMapCoordsStore();

  return (
    <div className="w-full">
      <Map
        initialViewState={{
          longitude,
          latitude,
          zoom,
        }}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
        onMove={(state) => {
          const { latitude, longitude, zoom } = state.viewState;
          setCoords(longitude, latitude, zoom);
        }}
      >
        {!hasUserMoved && <YouAreHere />}
        <PizzeriasMarkers />
      </Map>
    </div>
  );
}
