import Head from 'next/head';
import {useRouter} from 'next/router';
import {ClayIconSpriteContext} from '@clayui/icon';
import ClayLink, {ClayLinkContext} from '@clayui/link';
import ClayNavigationBar from '@clayui/navigation-bar';
import Link from 'next/link';

const spritemap = '';

import '../styles/globals.scss';
import '../styles/prism-dracula.css';

function MyApp({Component, pageProps}) {
	const {asPath} = useRouter();

	return (
		<div className="autofit-col" style={{minHeight: '100vh'}}>
			<Head>
				<title>Liferay frontend.dev</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<ClayLinkContext.Provider
				value={({href, ...otherProps}: any) => (
					<Link href={href} passHref>
						<a {...otherProps} />
					</Link>
				)}
			>
				<main>
					<ClayIconSpriteContext.Provider value={spritemap}>
						<div className="container-fluid container-fluid-max-xl">
							<div className="autofit-float-sm-down autofit-padded autofit-row">
								<h1 className="autofit-col autofit-col-expand brand">
									{'Liferay frontend.dev'}
								</h1>
								<div className="autofit-col flex-wrap">
									<ClayNavigationBar
										inverted
										triggerLabel="Item 1"
										spritemap={spritemap}
									>
										<ClayNavigationBar.Item
											active={asPath === '/'}
										>
											<ClayLink
												className="nav-link"
												displayType="unstyled"
												href="/"
											>
												Home
											</ClayLink>
										</ClayNavigationBar.Item>
										<ClayNavigationBar.Item>
											<ClayLink
												className="nav-link"
												displayType="unstyled"
												href="https://www.liferay.com/careers"
												target="_blank"
												rel="noopener noreferrer"
											>
												{'Careers'}
											</ClayLink>
										</ClayNavigationBar.Item>
									</ClayNavigationBar>
								</div>
							</div>
						</div>

						<div className="container-fluid container-fluid-max-lg">
							<Component {...pageProps} />
						</div>
					</ClayIconSpriteContext.Provider>
				</main>
			</ClayLinkContext.Provider>

			<footer style={{marginTop: 'auto', padding: '12px 0'}}>
				<div className="container-fluid container-fluid-max-xl text-center">
					<a
						href="http://liferay.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Liferay Inc.
					</a>
				</div>
			</footer>
		</div>
	);
}

export default MyApp;
