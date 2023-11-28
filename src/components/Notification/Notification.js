import { notification } from "antd";

export const Notification = (type, title, message) => {
	const content = {
		message: title,
		description: message,
	}
	switch(type) {
		case "success":
			notification.success(content)
			break;
		case "error":
			notification.error(content)
			break;
		case "info":
			notification.info(content)
			break;
		case "warning":
			notification.warning(content)
			break;
	}
};