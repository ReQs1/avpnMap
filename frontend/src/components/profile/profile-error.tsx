import errorImage from "@/assets/profile-error.webp";

export default function ProfileError() {
  return (
    <main className="grow bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center rounded-2xl bg-white px-6 py-12 shadow-sm">
          <img
            src={errorImage}
            alt="Error loading profile"
            className="mb-6 h-48 w-48 object-contain"
          />
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            Failed to load profile
          </h2>
          <p className="text-gray-500">
            Something went wrong. Please try again later.
          </p>
        </div>
      </div>
    </main>
  );
}
