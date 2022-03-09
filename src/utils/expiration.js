export const CalculateExpiration = (timeAdded, shelfLife) => {
	shelfLife = shelfLife * 24 * 60 * 60 * 1000;
	const expDate = new Date(timeAdded + shelfLife);

	const today = Date.now();
	const dif = expDate - today;

	const day = 1000 * 60 * 60 * 24;

	if (dif < 0) {
		return (
			<span style={{ color: "#ff4d62", fontWeight: "600" }}>EXPIRED</span>
		);
	} else {
		const difDays = Math.floor(dif / day);
		if (difDays === 0) {
			return (
				<span style={{ color: "#ff914d", fontWeight: "600" }}>
					TODAY
				</span>
			);
		} else if (difDays <= 3) {
			return (
				<span style={{ color: "#ff914d", fontWeight: "600" }}>
					{difDays}d
				</span>
			);
		} else {
			return difDays + "d";
		}
	}
};

export const CalculateDays = (timeAdded, shelfLife) => {
	shelfLife = shelfLife * 24 * 60 * 60 * 1000;
	const expDate = new Date(timeAdded + shelfLife);

	const today = Date.now();
	const dif = expDate - today;

	const day = 1000 * 60 * 60 * 24;

	return Math.floor(dif / day);
};

export const CalculateExpirationAbs = (timeAdded, shelfLife) => {
	shelfLife = shelfLife * 24 * 60 * 60 * 1000;
	const expDate = new Date(timeAdded + shelfLife);

	const today = Date.now();
	const dif = expDate - today;

	return dif;
};

export const MinusDay = (setChangeDays) => {
	var days = parseInt(document.getElementById("daysInput").value);
	if (days > 0) {
		setChangeDays((currDay) => {
			return currDay - 1;
		});
	}
};

export const PlusDay = (setChangeDays) => {
	var days = parseInt(document.getElementById("daysInput").value);
	if (days < 100) {
		setChangeDays((currDay) => {
			return currDay + 1;
		});
	}
};
