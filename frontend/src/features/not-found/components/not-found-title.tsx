import Icon from "@/assets/404-icon.webp";

function NotFoundTitle() {
  return (
    <>
      <div className="flex flex-col items-center">
        <img
          className="h-48 w-48"
          src={Icon}
          alt="Confused cartoon pizza chef holding a pizza and wrench, looking worried about the missing page"
        />
        <p className="text-6xl font-bold tracking-wider text-gray-300 sm:text-7xl">
          404
        </p>
      </div>
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800">
          Oops! Pizza Not Found
        </h2>
        <p className="mt-4 mb-6 text-lg text-gray-600 sm:text-xl">
          Looks like this page went on a pizza hunt and got lost! 🍕
        </p>
        <p className="mx-auto max-w-[450px] text-gray-500">
          The page you're looking for doesn't exist. It might have been moved,
          deleted, or you entered the wrong URL.
        </p>
      </div>
    </>
  );
}

export default NotFoundTitle;
