import { toast } from 'sonner';
import CONST from './Constants';

/****************** Fixed Warning Toast *******************/
export function showWarningToast() {
	toast.warning(CONST.somethingWentWrong, {
		position: 'top-right',
		closeButton: true,
		style: {
			backgroundColor: 'red',
			color: 'white'
		}
	});
}

/****************** Custom Success Toast *******************/
export function showSuccessToast(message, options = {}) {
	toast.success(message, {
		position: 'top-right',
		closeButton: true,
		...options
	});
}

/****************** Custom Error Toast *******************/
export function showErrorToast(message, options = {}) {
	toast.error(message, {
		position: 'top-right',
		closeButton: true,
		...options
	});
}

/****************** Custom Info Toast *******************/
export const showInfoToast = (message, options = {}) => {
	toast.info(message, {
		position: 'top-right',
		closeButton: true,
		...options
	});
};
