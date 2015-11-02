import React from 'react';
import { Panel } from '../_common';
import WatchlistCard from './WatchlistCard';

export default (props) => (
	<Panel title="Watchlist" position={props.position}>
		<WatchlistCard {...props} />
	</Panel>
);