import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "@/features/layout/components/header/header";

export const Route = createFileRoute("/(app)")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <>
      <Header />
      <main className="flex flex-1 items-stretch">
        <Outlet />
      </main>
    </>
  );
}
