import PizzeriasMarkers from "@/features/map/components/markers/pizzerias-markers";
import YouAreHere from "@/features/map/components/markers/you-are-here";
import { pizzeriasQuery } from "@/features/map/api/pizza-query-options";
import { createFileRoute } from "@tanstack/react-router";
import { Map } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useMapCoordsStore } from "@/features/map/store/map-coords-store";
import { useThemeStore } from "@/features/layout/theme-store";
import MapController from "@/features/map/components/map-controller";

export const Route = createFileRoute("/(app)/map")({
  head: () => ({ meta: [{ title: "Map — avpnMap" }] }),
  loader: (ctx) => {
    const { context } = ctx;
    context.queryClient.ensureQueryData(pizzeriasQuery);
  },
  component: MapPage,
});

function MapPage() {
  const { latitude, longitude, zoom, setCoords, hasUserMoved } =
    useMapCoordsStore();
  const { theme } = useThemeStore();

  return (
    <div className="w-full">
      <Map
        initialViewState={{
          longitude,
          latitude,
          zoom,
        }}
        mapStyle={
          theme === "dark"
            ? "https://tiles.openfreemap.org/styles/dark"
            : "https://tiles.openfreemap.org/styles/liberty"
        }
        onMoveEnd={(state) => {
          const { latitude, longitude, zoom } = state.viewState;
          setCoords(longitude, latitude, zoom);
        }}
        renderWorldCopies={false}
        dragRotate={false}
        touchPitch={false}
      >
        <MapController />
        {!hasUserMoved && <YouAreHere />}
        <PizzeriasMarkers />
      </Map>
    </div>
  );
}
