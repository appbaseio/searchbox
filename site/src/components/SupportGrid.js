import React from 'react';
import { Grid, Card, Title } from '@appbaseio/designkit';

// eslint-disable-next-line
export default ({ configName }) => {
	const imagePrefix = configName === 'vue' ? '../../searchbox/images/vue' : '../../searchbox/images/support';
	return (
		<Grid
			size={4}
			lgSize={2}
			smSize={1}
			gutter="20px"
			lgGutter="12px"
			smGutter="0px"
			style={{
				marginTop: '60px',
			}}
		>
			<Card big href="https://docs.appbase.io/docs/reactivesearch/gettingstarted/">
				<img src={`${imagePrefix}/Documentation.svg`} alt="Documentation" />
				<Title>Documentation</Title>
				<p>
					Dive in to learn all about{' '}
					<span
						style={{
							color: '#0033FF',
						}}
					>
						Search UI
					</span>{' '}
					development for all platforms.
				</p>
			</Card>
			<Card big href="https://medium.appbase.io/tagged/javascript">
				<img src={`${imagePrefix}/Tutorials.svg`} alt="Tutorials" />
				<Title>Tutorials</Title>
				<p>Get inspiration with these tutorial guides.</p>
			</Card>
			<Card big href="https://appbase.io/support">
				<img src={`${imagePrefix}/Support.png`} alt="Support" />
				<Title>Support</Title>
				<p>
					Get first-class support from appbase.io for your search.
				</p>
			</Card>
			<Card big href="https://gitter.im/appbaseio/reactivesearch">
				<img src={`${imagePrefix}/Gitter.svg`} alt="Gitter" />
				<Title>Community</Title>
				<p>
					Join our community on Gitter.
				</p>
			</Card>
		</Grid>
	);
};
