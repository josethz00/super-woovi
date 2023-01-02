import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaBars, FaDiscord, FaHome, FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import {
	MdChatBubble,
	MdLock,
	MdOutlineClose,
	MdQuestionAnswer,
} from 'react-icons/md';
import classNames from 'classnames';

/**
 * Homepage component
 * @returns {JSX.Element}
 */
const Home: NextPage = (): JSX.Element => {
	const { data: sessionData } = useSession();
	const router = useRouter();
	const [navbarOpen, setNavbarOpen] = useState<boolean>(false);

	/**
	 * Notify that the user must sign in to join discord
	 * @returns {string}
	 */
	const notifyError = (): string =>
		toast.custom(
			(t) => (
				<div
					className={classNames([
						'relative flex w-96 translate-y-0 transform-gpu flex-row items-center justify-between rounded-xl bg-red-900 px-4 py-6 text-white shadow-2xl transition-all duration-700 ease-in-out hover:translate-y-1 hover:shadow-none',
						t.visible ? 'top-0' : '-top-96',
					])}
				>
					<div className="text-xl">
						<MdLock />
					</div>
					<div className="ml-4 flex cursor-default flex-col items-start justify-center">
						<h1 className="text-md mb-2 font-bold leading-none">
							Could not generate discord invite link
						</h1>
						<p className="text-sm leading-none">
							You must be signed in to join the discord server. Please sign in
						</p>
					</div>
					<div
						className="absolute top-0 right-0 cursor-pointer p-2"
						onClick={() => toast.dismiss(t.id)}
					>
						<MdOutlineClose />
					</div>
				</div>
			),
			{ id: 'unique-notification', position: 'top-center', duration: 6000 },
		);

	return (
		<>
			<Head>
				<title>Super Woovi</title>
				<meta name="description" content="Super Woovi QA" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Toaster />

			<nav className="fixed flex w-full items-center justify-between bg-gradient-to-r from-[#1b263b] to-[#1e1b2a] py-4 px-6">
				<div className="container mx-auto flex items-center justify-between">
					<div className="relative flex w-1/3 justify-between">
						<Link
							className="mr-4 inline-block whitespace-nowrap py-2 text-sm font-bold leading-relaxed text-white"
							href="/"
						>
							Super Woovi QA
						</Link>
						<button
							className="block cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-white outline-none focus:outline-none lg:hidden"
							type="button"
							onClick={() => setNavbarOpen(!navbarOpen)}
						>
							<FaBars />
						</button>
					</div>

					<div className="relative w-full max-w-sm lg:max-w-sm">
						<FaSearch className="absolute mt-2.5 ml-3 text-gray-400" />
						<input
							className="placeholder:cold-gray-400 h-9 w-full rounded-xl border-2 border-slate-600 border-white
                bg-transparent pl-10 text-sm leading-relaxed text-white outline-none
                placeholder:italic focus:outline-none"
							type="text"
							placeholder="Search for tags..."
						/>
					</div>

					<div
						className={
							'w-1/3 items-center lg:flex' + (navbarOpen ? ' flex' : ' hidden')
						}
						id="example-navbar-danger"
					>
						<ul className="align-center flex list-none flex-col justify-center lg:ml-auto lg:flex-row">
							<li className="nav-item">
								{sessionData?.user ? (
									<Link
										className="flex items-center px-3 py-2 text-sm font-bold leading-snug text-white hover:opacity-75"
										href="https://discord.gg/wtH3ewVtK7"
									>
										<span>Join Discord</span>
										<FaDiscord className="ml-2 text-xl" />
									</Link>
								) : (
									<button
										className="flex items-center justify-center px-3 py-2 text-sm font-bold leading-snug text-white hover:opacity-75"
										onClick={() => notifyError()}
									>
										<span>Join Discord</span>
										<FaDiscord className="ml-2 text-xl" />
									</button>
								)}
							</li>
							<li className="nav-item">
								{sessionData?.user?.image ? (
									<Image
										src={sessionData?.user?.image}
										className="ml-4 cursor-pointer rounded-full object-cover"
										width={40}
										height={40}
										alt="profile picture"
									/>
								) : (
									<button
										className="ml-4 flex items-center justify-center rounded-xl bg-[hsl(577,100%,70%)] py-2 px-6 text-xs font-bold text-white hover:opacity-75"
										onClick={() => signIn()}
									>
										Sign in
									</button>
								)}
							</li>
						</ul>
					</div>
				</div>
			</nav>

			<div className="container relative mx-auto mt-32 grid grid-cols-3 gap-4">
				<div className="flex min-h-screen justify-center">
					<div className="container flex flex-col gap-12 px-4">
						<p className="ml-4 text-lg font-bold uppercase tracking-tight text-gray-300">
							Menu
						</p>
						<ul className="flex flex-col gap-4">
							<li className="flex w-[250px] cursor-pointer items-center gap-4 rounded-lg bg-white/10 py-[8px] px-6 hover:bg-white/20">
								<FaHome className="text-xl text-[hsl(569,100%,70%)]" />
								<p className="font-bold text-gray-300 transition-opacity duration-200 hover:text-white">
									Home
								</p>
							</li>
							<li className="flex w-[250px] cursor-pointer items-center gap-4 rounded-lg py-[8px] px-6">
								<MdQuestionAnswer className="text-xl text-gray-500" />
								<p className="text-gray-300 transition-opacity duration-200 hover:opacity-75">
									My Questions
								</p>
							</li>
						</ul>
					</div>
				</div>

				<div className="min-h-screen">
					<div className="container flex w-full flex-col items-center gap-12">
						<div className="flex h-48 w-full flex-col gap-4 rounded-md bg-white/10 p-4 text-white hover:bg-white/20"></div>
						<div className="flex h-48 w-full flex-col gap-4 rounded-md bg-white/10 p-4 text-white hover:bg-white/20"></div>
						<div className="flex h-48 w-full flex-col gap-4 rounded-md bg-white/10 p-4 text-white hover:bg-white/20"></div>
					</div>
				</div>

				<div className="flex min-h-screen justify-center">
					<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
						<h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
							Super <span className="text-[hsl(577,100%,70%)]">Woovi</span> App
						</h1>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
							<Link
								className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
								href="new-group"
								onClick={(e) => {
									e.preventDefault();
									if (!sessionData) {
										alert('You need to be logged in to create a group');
										return;
									} else {
										router.push('new-group');
									}
								}}
							>
								<h3 className="text-2xl font-bold">Create group →</h3>
								<div className="text-lg">
									Create your Secret Santa Group - Enjoy the holidays by
									creating a group to do the Secret Santa with your friends and
									family.
								</div>
							</Link>
							<Link
								className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
								href="my-groups"
								onClick={(e) => {
									e.preventDefault();
									if (!sessionData) {
										alert('You need to be logged in to create a group');
										return;
									} else {
										router.push('my-groups');
									}
								}}
							>
								<h3 className="text-2xl font-bold">My Secret Santas →</h3>
								<div className="text-lg">
									View your Secret Santas - View your Secret Santas and see who
									you are giving a gift to and who is giving you a gift
									(secret).
								</div>
							</Link>
						</div>
						<div className="flex flex-col items-center gap-2">
							<AuthShowcase />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;

/**
 * Simple component to show the current session and sign in/out
 * @returns {JSX.Element}
 */
const AuthShowcase: React.FC = (): JSX.Element => {
	const { data: sessionData } = useSession();

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<p className="text-center text-2xl text-white">
				{sessionData && <span>Logged in as {sessionData.user?.name}</span>}
				{!sessionData && <span>Not logged in</span>}
			</p>
			<button
				className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
				onClick={sessionData ? () => signOut() : () => signIn()}
			>
				{sessionData ? 'Sign out' : 'Sign in'}
			</button>
		</div>
	);
};
