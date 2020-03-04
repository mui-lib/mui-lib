//

export const onContextMenuPrevented = (e: React.MouseEvent) => e.preventDefault();

export const onOtherMouseButtonsClicked = (onRightButtonClicked?: Function, onMiddleButtonClicked?: Function, onLeftButtonClicked?: Function) =>
	(e: React.MouseEvent) => {
		// @see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
		switch (e.button) {
			case 0:
				if (!onLeftButtonClicked) {return;}
				onLeftButtonClicked();
				break;
			case 1:
				if (!onMiddleButtonClicked) {return;}
				onMiddleButtonClicked();
				break;
			case 2:
				if (!onRightButtonClicked) {return;}
				onRightButtonClicked();
				break;
			default:
				return;
		}
		// e.preventDefault();
	};
