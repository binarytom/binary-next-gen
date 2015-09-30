import React from 'react';
import { TransitionMotion } from 'react-motion';

const ModalContent = (props) => {
	const { onClose, children } = props;

	return (
		<div className="full-screen-overlay" onClick={onClose} style={{ opacity: anim.opacity.val }}>
			<div className="modal" style={{ transform: `scale(${anim.scale.val})` }}>
				<button className="close-btn" onClick={onClose}>X</button>
				{children}
			</div>
		</div>
	);
};

const endValue = () => ({
	modal: {
		scale: { val: 1, config: [1500, 40] },
		opacity: { val: 1, config: [1000, 40] },
	},
});

const getEndValue = (shown) => (!shown) ? {} : endValue;

const willEnter = () => ({
	scale: { val: 0.75 },
	opacity: { val: 0.5 },
});

const willLeave = () => ({
	scale: { val: 0, config: [1000, 40] },
	opacity: { val: 0, config: [1000, 40] },
});

const Modal = (props) => (
	<TransitionMotion
        styles={getEndValue(props.shown)}
        willEnter={willEnter}
        willLeave={willLeave}>
        {interpolatedStyles =>
            <div>
            	{Object.keys(interpolatedStyles).map(key =>
					<div key={key}>
						<ModalContent anim={x[key]} />
					</div>
            	)}
          </div>
        }
      </TransitionMotion>
);

Modal.propTypes = {
	shown: React.PropTypes.bool,
	onClose: React.PropTypes.func,
	children: React.PropTypes.any,
};

export default Modal;
