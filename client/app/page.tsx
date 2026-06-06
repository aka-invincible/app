import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="text-center px-6 max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Ad-Tack
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Connect with talented creators and influencers for your projects. Find
          amazing freelancers or showcase your skills.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/auth/login"
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 rounded-lg font-semibold hover:bg-indigo-50 dark:hover:bg-gray-700 transition"
          >
            Get Started
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              For Businesses
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Post projects and find talented creators and influencers
            </p>
          </div>
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              For Creators
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Discover exciting projects and opportunities in your niche
            </p>
          </div>
          <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              For Influencers
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Connect with brands and grow your influence
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
