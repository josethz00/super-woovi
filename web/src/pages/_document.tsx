import { Html, Head, Main, NextScript } from 'next/document';

/**
 * Nextjs document component
 * @returns {JSX.Element}
 */
export default function Document(): JSX.Element {
	return (
		<Html lang="en">
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
