import Icon from "@/assets/404-icon.webp";

function NotFoundTitle() {
  return (
    <>
      <div className="relative flex w-full flex-col items-center">
        <div
          className="absolute top-1/2 left-1/4 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl dark:bg-[#ef444408]"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl dark:bg-[#ef444408]"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 left-3/4 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl dark:bg-[#ef444408]"
          aria-hidden="true"
        />
        <img
          className="h-48 w-48"
          src={Icon}
          alt="Confused cartoon pizza chef holding a pizza and wrench, looking worried about the missing page"
        />
        <p className="text-6xl font-bold tracking-wider text-gray-300 sm:text-7xl dark:text-zinc-500">
          404
        </p>
      </div>
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-zinc-100">
          Oops! Pizza Not Found
        </h2>
        <p className="mt-4 mb-6 text-lg text-gray-600 sm:text-xl dark:text-zinc-500">
          Looks like this page went on a pizza hunt and got lost! 🍕
        </p>
        <p className="mx-auto max-w-[450px] text-gray-500 dark:text-zinc-500">
          The page you're looking for doesn't exist. It might have been moved,
          deleted, or you entered the wrong URL.
        </p>
      </div>
    </>
  );
}

export default NotFoundTitle;
