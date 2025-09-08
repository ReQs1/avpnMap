import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "@/components/header/header";

export const Route = createFileRoute("/(app)")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <>
      <Header />
      <main className="grow">
        <Outlet />
      </main>
    </>
  );
}
