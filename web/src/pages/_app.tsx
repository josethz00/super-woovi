import '../styles/globals.css';
import type { AppProps } from 'next/app';

/**
 * App component
 * @param param0 - default nextjs app props
 * @returns {JSX.Element}
 */
export default function App({ Component, pageProps }: AppProps): JSX.Element {
	return <Component {...pageProps} />;
}
