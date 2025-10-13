import ClusterMarker from "@/components/map/cluster-marker";
import PizzeriaMarker from "@/components/map/pizzeria-marker";
import { pizzeriasQuery } from "@/lib/api/query-options/pizza-query-options";
import { useQuery } from "@tanstack/react-query";
import { useMap } from "@vis.gl/react-maplibre";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import useSupercluster from "use-supercluster";

function PizzeriasMarkers() {
  const [currentOpenPizzeriaId, setCurrentOpenPizzeriaId] = useState<
    number | null
  >(null);
  const [mapBounds, setMapBounds] = useState<
    [number, number, number, number] | undefined
  >(undefined);
  const [mapZoom, setMapZoom] = useState<number>(0);
  const { data: pizzerias, error } = useQuery(pizzeriasQuery);
  const { current: map } = useMap();

  // Update bounds and zoom when map moves
  useEffect(() => {
    if (!map) return;

    const updateMapState = () => {
      const bounds = map.getBounds();
      setMapBounds([
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth(),
      ]);
      setMapZoom(map.getZoom());
    };

    // Set initial state
    updateMapState();

    // Listen to map events
    map.on("move", updateMapState);
    map.on("zoom", updateMapState);

    return () => {
      map.off("move", updateMapState);
      map.off("zoom", updateMapState);
    };
  }, [map]);

  const points = useMemo(() => {
    if (!pizzerias) return [];
    return pizzerias.map((pizzeria) => ({
      type: "Feature" as const,
      properties: {
        cluster: false,
        pizzeria,
      },
      geometry: {
        type: "Point" as const,
        coordinates: [pizzeria.lng, pizzeria.lat],
      },
    }));
  }, [pizzerias]);

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds: mapBounds,
    zoom: mapZoom,
    options: { radius: 75, maxZoom: 20 },
  });

  if (error) {
    toast.error("Unable to load pizzeria locations.", {
      id: "pizzerias-error",
      position: "bottom-center",
    });
    return null;
  }

  const handleCurrentOpenPizzeriaId = (targetId: number | null) => {
    if (currentOpenPizzeriaId === targetId) {
      setCurrentOpenPizzeriaId(null);
      return;
    }
    setCurrentOpenPizzeriaId(targetId);
  };

  const handleClusterClick = (
    clusterId: number,
    latitude: number,
    longitude: number,
  ) => {
    if (!supercluster || !map) return;
    const expansionZoom = Math.min(
      supercluster.getClusterExpansionZoom(clusterId),
      20,
    );
    map.easeTo({
      center: [longitude, latitude],
      zoom: expansionZoom,
    });
  };

  return (
    <>
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster } = cluster.properties;

        if (isCluster) {
          const pointCount = (cluster.properties as { point_count: number })
            .point_count;
          return (
            <ClusterMarker
              key={`cluster-${cluster.id}`}
              latitude={latitude}
              longitude={longitude}
              pointCount={pointCount}
              onClick={() =>
                handleClusterClick(cluster.id as number, latitude, longitude)
              }
            />
          );
        }

        return (
          <PizzeriaMarker
            key={cluster.properties.pizzeria.id}
            pizzeria={cluster.properties.pizzeria}
            currOpenPizzeriaId={currentOpenPizzeriaId}
            onClick={handleCurrentOpenPizzeriaId}
          />
        );
      })}
    </>
  );
}

export default PizzeriasMarkers;
