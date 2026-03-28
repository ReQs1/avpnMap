import errorImage from "@/assets/profile-error.webp";

export default function ProfileError() {
  return (
    <div className="grow bg-gray-50 px-4 py-8 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center rounded-2xl border border-transparent bg-white px-6 py-12 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <img
            src={errorImage}
            alt="Error loading profile"
            className="mb-6 h-48 w-48 object-contain"
          />
          <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-zinc-100">
            Failed to load profile
          </h2>
          <p className="text-gray-500 dark:text-zinc-400">
            Something went wrong. Please try again later.
          </p>
        </div>
      </div>
    </div>
  );
}
