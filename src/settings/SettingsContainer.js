import React from 'react';
import { bindActionCreators } from 'redux';
import { getSettings } from '../_reducers/SettingsReducers';
import * as SettingsActions from '../_actions/SettingsActions';
import { connect } from 'react-redux';
import SettingsCard from './SettingsCard';

@connect(state => ({ settings: getSettings(state) }))
export default class SettingsContainer extends React.Component {

	static propTypes = {
		dispatch: React.PropTypes.func.isRequired,
		settings: React.PropTypes.object,
	};

	render() {
		return (
			<SettingsCard
				actions={bindActionCreators(SettingsActions, this.props.dispatch)}
				{...this.props} />
		);
	}
}