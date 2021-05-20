import ClayLayout from '@clayui/layout';
import ClayCard, {ClayCardWithNavigation} from '@clayui/card';
import {getAllDocs} from '../utils/docs';

import type {GetStaticProps} from 'next';

export default function Home({articles}) {
	return (
		<section>
			<div className="home-banner container-fluid container-fluid-max-sm">
				We are Liferay's team of Frontend Engineers.
			</div>

			<ClayLayout.ContainerFluid view>
				<h2 style={{color: '#FFF'}}>Articles</h2>
				<ClayCard.Group>
					{articles.map(({content, meta, slug}) => (
						<ClayCardWithNavigation
							href={`/articles/${slug}`}
							key={slug}
							title={meta.title}
						>
							<img src={meta.coverArtwork} />
						</ClayCardWithNavigation>
					))}
				</ClayCard.Group>
			</ClayLayout.ContainerFluid>
		</section>
	);
}

export const getStaticProps: GetStaticProps = async ({params}) => {
	const docs = getAllDocs();

	return {
		props: {
			articles: docs,
		},
	};
};
