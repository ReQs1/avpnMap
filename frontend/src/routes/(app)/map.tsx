import PizzeriasMarkers from "@/features/map/components/markers/pizzerias-markers";
import YouAreHere from "@/features/map/components/markers/you-are-here";
import { pizzeriasQuery } from "@/features/map/api/pizza-query-options";
import { createFileRoute } from "@tanstack/react-router";
import { Map } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useMapCoordsStore } from "@/features/map/store/map-coords-store";

export const Route = createFileRoute("/(app)/map")({
  head: () => ({
    meta: [
      { title: "Map — avpnMap" },
      {
        name: "description",
        content:
          "Explore a live map of AVPN certified pizzerias near you and around the world.",
      },
      { property: "og:title", content: "Map — avpnMap" },
      {
        property: "og:description",
        content:
          "Explore a live map of AVPN certified pizzerias near you and around the world.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Map — avpnMap" },
      {
        name: "twitter:description",
        content:
          "Explore a live map of AVPN certified pizzerias near you and around the world.",
      },
    ],
  }),
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
        renderWorldCopies={false}
      >
        {!hasUserMoved && <YouAreHere />}
        <PizzeriasMarkers />
      </Map>
    </div>
  );
}
