import MinimalHeader from "@/features/layout/components/minimal-header";
import NotFoundFeatureCards from "@/features/not-found/components/not-found-feature-cards";
import NotFoundTitle from "@/features/not-found/components/not-found-title";
import NotFoundNavigation from "@/features/not-found/components/not-found-buttons";
import NotFoundFunFact from "@/features/not-found/components/not-found-fun-fact";
import Footer from "@/features/layout/components/footer";

function GlobalNotFound() {
  return (
    <>
      <MinimalHeader />

      <main className="mx-auto flex max-w-[675px] grow flex-col items-center gap-6 px-4 pb-10">
        <NotFoundTitle />

        <NotFoundFeatureCards />

        <NotFoundNavigation />

        <NotFoundFunFact />
      </main>

      <Footer />
    </>
  );
}

export default GlobalNotFound;
