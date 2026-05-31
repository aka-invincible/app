import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function UserPage() {
	const cookieStore = cookies();
	const cookieString = Array.from(cookieStore).map(([name, value]) => `${name}=${value}`).join('; ');

	try {
		const res = await fetch(`http://localhost:5000/api/auth/me`, {
			headers: {
				'cookie': cookieString
			},
			cache: 'no-store'
		});

		if (!res.ok) throw new Error('Not authenticated');

		const user = await res.json();

		return (
			<div className="mx-auto max-w-3xl">
				<div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
					<h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Profile</h1>
					<p className="mt-4 text-gray-700 dark:text-gray-300">Name: {user.name}</p>
					<p className="text-gray-700 dark:text-gray-300">Email: {user.email}</p>
					<p className="text-gray-700 dark:text-gray-300">Role: {user.role}</p>
					<div className="mt-6">
						<Link href="/user/jobs" className="rounded-md bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700">View Jobs</Link>
					</div>
				</div>
			</div>
		);
	} catch (err) {
		return (
			<div className="mx-auto max-w-3xl">
				<div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
					<h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Profile</h1>
					<p className="mt-4 text-gray-700 dark:text-gray-300">You are not signed in.</p>
					<div className="mt-6">
						<Link href="/auth/login" className="rounded-md bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700">Sign in</Link>
					</div>
				</div>
			</div>
		);
	}
}
