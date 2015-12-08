import React from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { MarketSelector } from '../_common';
import AssetIndexTable from './AssetIndexTable';

export default class AssetIndexCard extends React.Component {

	shouldComponentUpdate = shouldPureComponentUpdate;

	static propTypes = {
		actions: React.PropTypes.object.isRequired,
		assets: React.PropTypes.object.isRequired,
		assetIndexFilter: React.PropTypes.object.isRequired,
	};

	render() {
		const { actions, assets, assetIndexFilter } = this.props;
		const { index, list } = assets.toJS();
		const submarket = assetIndexFilter.get('submarket');
		const submarketForAsset = symbol => list.find(x => x.symbol === symbol).submarket_display_name;

		return (
			<div>
				<MarketSelector
					onChange={x => actions.updateAssetIndexSubmarket(x)}
					showAllOption={false} />
				<AssetIndexTable
					key={submarket}
					submarket={submarket}
					index={index.filter(a => submarketForAsset(a[0]) === submarket)} />
			</div>
		);
	}
}