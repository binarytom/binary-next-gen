import React from 'react';
import SegmentedControl from '../common/SegmentedControl';
import PricingTable from './PricingTable';
import PricingTableFilter from './PricingTableFilter';

const PricingTablePane = ({onAssetSelect}) => (
	<div>
		<PricingTableFilter />
		<SegmentedControl
			segments={['Mid', 'Bid', 'Ask', 'Spread']}
			onSelect={onAssetSelect} />
		<PricingTable />
	</div>
);

export default PricingTablePane;
