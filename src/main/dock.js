import { app } from 'electron';
import { EventEmitter } from 'events';
import { getMainWindow } from './mainWindow';
import { getTrayIconImage, getAppIconImage } from './icon';


let state = {
	badge: null,
	hasTrayIcon: false,
};
const events = new EventEmitter();

const getBadgeText = ({ badge }) => {
	if (badge === '•') {
		return '•';
	}

	if (Number.isInteger(badge)) {
		return String(badge);
	}

	return '';
};

const update = async (previousState = {}) => {
	if (process.platform === 'darwin') {
		app.dock.setBadge(getBadgeText(state));
		const count = Number.isInteger(state.badge) ? state.badge : 0;
		const previousCount = Number.isInteger(previousState.badge) ? state.badge : 0;
		if (count > 0 && previousCount === 0) {
			app.dock.bounce();
		}
	}

	const mainWindow = await getMainWindow();

	if (process.platform === 'linux' || process.platform === 'win32') {
		const image = state.hasTrayIcon ? getAppIconImage() : getTrayIconImage({ badge: state.badge });
		mainWindow.setIcon(image);
	}

	if (!mainWindow.isFocused()) {
		const count = Number.isInteger(state.badge) ? state.badge : 0;
		mainWindow.flashFrame(count > 0);
	}
};

const setState = (partialState) => {
	const previousState = state;
	state = {
		...state,
		...partialState,
	};
	update(previousState);
};

const mount = () => {
	update();
};

const unmount = async () => {
	events.removeAllListeners();

	const mainWindow = await getMainWindow();
	mainWindow.setIcon(getAppIconImage());
	mainWindow.flashFrame(false);
};

export default Object.assign(events, {
	setState,
	mount,
	unmount,
});
