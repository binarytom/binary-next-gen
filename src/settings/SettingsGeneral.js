import React, { PureComponent } from 'react';
import { M, Button } from 'binary-components';
import { actions } from '../_store';
import { api } from '../_data/LiveData';
import VirtualTopUpConfirmation from './VirtualTopUpConfirmation';
import Modal from '../containers/Modal';

export default class SettingsGeneral extends PureComponent {

	props: {
		loginid: string,
		boot: object,
		balance: string,
        settings: object,
	};

	onThemeChange = (e: SyntheticEvent) =>
		actions.updateBoot('theme', e.target.value);

	async onTopup() {
        try {
            const response = await api.topUpVirtualAccount();
            actions.updateSettingFields({ topup_virtual: { topup_virtual: response.topup_virtual } });
        } catch (e) {
            actions.updateSettingFields({ topup_virtual: { error: e.message } });
		}
	}

	hideTopup = () =>
		actions.updateSettingFields({ topup_virtual: null }, false);

	render() {
		const { theme } = this.props.boot;
		const { balance } = this.props;
        const topupVirtual = this.props.settings.topup_virtual;

		return (
			<div className="settings-general">
				<label htmlFor="theme-picker"><M m="Color Theme" /></label>
				<select onChange={this.onThemeChange} value={theme} id="theme-picker" className="theme-picker">
					<option value="light">Light</option>
					<option value="dark">Dark</option>
				</select>

				<Modal
					shown={topupVirtual}
					onClose={this.hideTopup}
				>
					<VirtualTopUpConfirmation
						response={topupVirtual || {}}
						onClose={this.hideTopup}
					/>
                </Modal>
                {balance < 1000 &&
                    <Button
						text="Deposit USD 10,000 virtual money to your account"
						className="buy-btn"
						onClick={this.onTopup}
                    />
                }
			</div>
		);
	}
}
