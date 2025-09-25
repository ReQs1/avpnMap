import MinimalHeader from "@/components/common/minimal-header";
import NotFoundFeatureCards from "@/components/global-not-found/not-found-feature-cards";
import NotFoundTitle from "@/components/global-not-found/not-found-title";
import NotFoundNavigation from "@/components/global-not-found/not-found-buttons";
import NotFoundFunFact from "@/components/global-not-found/not-found-fun-fact";
import Footer from "@/components/common/footer";

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
