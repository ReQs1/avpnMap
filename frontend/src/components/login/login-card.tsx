import GoogleSvg from "@/components/common/google-svg";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function LoginCard() {
  return (
    <div className="mx-auto h-fit max-w-[460px] flex-1 space-y-6 rounded-lg border border-gray-100 bg-white px-8 py-6 text-center shadow-2xl">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Sign in to Track</h2>
        <p className="text-sm text-gray-500">
          Login to start tracking your pizza journey and unlock achievements
        </p>
      </div>
      <a
        href={`${BACKEND_URL}auth/google/login`}
        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-red-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-md transition-colors hover:bg-gray-50 focus-visible:bg-gray-50"
      >
        <GoogleSvg />
        <span>Continue with Google</span>
      </a>

      <div className="space-y-2 rounded-lg bg-gray-100 p-4 text-left">
        <p className="font-semibold text-gray-800">Why sign in?</p>
        <ul className="list-disc space-y-1 pl-4 text-xs text-gray-500 sm:text-sm">
          <li>Track your pizzeria visits</li>
          <li>Rate and review experiences</li>
          <li>Unlock achievements and ranks</li>
          <li>Connect with other pizza lovers</li>
        </ul>
      </div>
    </div>
  );
}

export default LoginCard;
