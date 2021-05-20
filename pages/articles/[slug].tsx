import ArticleLayout from '../../components/ArticleLayout';
import {getAllDocs, getDocBySlug} from '../../utils/docs';
import markdownToHtml from '../../utils/markdown';

import type {GetStaticProps, GetStaticPaths} from 'next';

export default function Doc({meta, content}) {
	return <ArticleLayout meta={meta}>{content}</ArticleLayout>;
}

export const getStaticProps: GetStaticProps = async ({params}) => {
	const doc = getDocBySlug(params.slug as string);

	const content = await markdownToHtml(doc.content || '');

	return {
		props: {
			...doc,
			content,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const docs = getAllDocs();

	return {
		paths: docs.map((doc) => {
			return {
				params: {
					slug: doc.slug,
				},
			};
		}),
		fallback: false,
	};
};
