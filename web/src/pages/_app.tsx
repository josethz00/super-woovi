import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

/**
 * App component
 * @param param0 - default nextjs app props
 * @returns {JSX.Element}
 */
export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
	return (
		<SessionProvider session={session}>
			<main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#0d1b2a] to-[#1b263b]">
				<Component {...pageProps} />
			</main>
		</SessionProvider>
	);
}
