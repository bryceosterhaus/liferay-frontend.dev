export default function Layout({children, meta: pageMeta}) {
	return (
		<>
			<div
				style={{
					background: '#FFF',
					borderRadius: 5,
					margin: '24px 0',
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						backgroundImage: `linear-gradient(to bottom,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.6)),url(${pageMeta.coverArtwork})`,
						backgroundSize: 'cover',
						height: 256,
						position: 'relative',
					}}
				>
					<h2
						className="container-fluid container-fluid-max-md"
						style={{
							fontSize: '3em',
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							color: '#FFF',
							textAlign: 'center',
						}}
					>
						{pageMeta.title}
					</h2>
				</div>

				<div className="px-6 my-2 text-center">
					<a href={`https://github.com/${pageMeta.author}`}>
						{pageMeta.author}
					</a>{' '}
					on {pageMeta.date}
				</div>

				<article
					className="prose lg:prose-xl px-6 m-auto my-4 sm:my-16"
					dangerouslySetInnerHTML={{__html: children}}
				/>
			</div>
		</>
	);
}
