import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function UserPage() {
	const cookieStore = await cookies();
	const cookieString = Array.from(cookieStore).map(([name, value]) => `${name}=${value}`).join('; ');

	const res = await fetch(`http://localhost:5000/api/auth/me`, {
		headers: {
			'cookie': cookieString
		},
		cache: 'no-store'
	});

	const user = res.ok ? await res.json() : null;

	if (!user) {
		return (
			<div className="mx-auto max-w-3xl">
				<div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-950/95">
					<h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Profile</h1>
					<p className="mt-4 text-slate-700 dark:text-slate-300">You are not signed in.</p>
					<div className="mt-6">
						<Link href="/auth/login" className="inline-flex rounded-full bg-teal-600 px-4 py-2 text-white transition hover:bg-teal-700">Sign in</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-3xl">
			<div className="rounded-[1.75rem] border border-slate-200 bg-white/95 p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-950/95">
				<h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Profile</h1>
				<p className="mt-4 text-slate-700 dark:text-slate-300">Name: {user.name}</p>
				<p className="text-slate-700 dark:text-slate-300">Email: {user.email}</p>
				<p className="text-slate-700 dark:text-slate-300">Role: {user.role}</p>
				<div className="mt-6">
					<Link href="/user/jobs" className="inline-flex rounded-full bg-teal-600 px-4 py-2 text-white transition hover:bg-teal-700">View Jobs</Link>
				</div>
			</div>
		</div>
	);
}
