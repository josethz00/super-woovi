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
			<Component {...pageProps} />
		</SessionProvider>
	);
}
