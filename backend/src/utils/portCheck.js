export const portCheck = (BACK_PORT) => {
	if (!BACK_PORT)
		throw new Error("BACK_PORT is not defined in .env!");

	const backPort = Number.parseInt(BACK_PORT, 10);

	if (
		!Number.isInteger(backPort) ||
		String(backPort) !== BACK_PORT.trim() ||
		backPort < 1 ||
		backPort > 65535
	)
		throw new Error("BACK_PORT must be a valid integer between 1 and 65535.");
	return backPort;
}