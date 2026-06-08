import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <main className="mx-auto w-full max-w-5xl rounded-[2rem] border border-slate-200 bg-white/95 p-10 shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-950/90">
        <div className="text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-teal-600 dark:text-teal-300">
            Your talent marketplace
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl">
            Ad-Tack
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Connect with talented creators and influencers for your next
            project. Discover opportunities, hire experts, and build meaningful
            campaigns.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/auth/login"
              className="inline-flex rounded-full bg-teal-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex rounded-full border-2 border-teal-600 px-8 py-3 text-sm font-semibold text-teal-700 transition hover:bg-teal-50 dark:border-teal-400 dark:text-teal-300 dark:hover:bg-slate-800"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "For Businesses",
              description:
                "Post projects and find talented creators and influencers",
            },
            {
              title: "For Creators",
              description:
                "Discover exciting projects and opportunities in your niche",
            },
            {
              title: "For Influencers",
              description: "Connect with brands and grow your influence",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/80"
            >
              <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
                {card.title}
              </h3>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
