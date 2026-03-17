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
      <div className="mx-auto flex w-full max-w-[675px] flex-col items-center gap-6 px-4 pt-8 pb-10 text-slate-800">
        <NotFoundTitle />

        <NotFoundFeatureCards />

        <NotFoundNavigation />

        <NotFoundFunFact />
      </div>

      <Footer />
    </>
  );
}

export default GlobalNotFound;
