import { pushData } from "../../utils/firebase";

const SaveFood = async (foodInfo, checked, otherName, uid, StorageLocation) => {
	for (var i in checked) {
		var today = new Date();
		var index = parseInt(checked[i]);

		try {
			await pushData(`/${StorageLocation}/${uid}`, {
				Name:
					index === foodInfo.length + 1
						? otherName
						: foodInfo[index][0],
				TimeAdded: today.getTime(),
			});
		} catch (error) {
			console.log(error);
		}
	}
};

export default SaveFood;
