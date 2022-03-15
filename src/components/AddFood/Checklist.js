import React from "react";
import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	TextField,
} from "@mui/material";

const Checklist = ({ foodInfo, checked, setOtherName }) => {
	foodInfo = Object.entries(foodInfo);

	const handleToggle = (value) => () => {
		value = String(value);
		if (!checked.includes(value)) {
			checked.push(value);
		} else {
			checked.splice(checked.indexOf(value), 1);
		}
	};

	let numFoods = 0;

	return (
		<FormGroup>
			{Object.entries(foodInfo).map((value, index) => {
				numFoods += 1;
				const labelId = `checkbox-list-secondary-label-${index}`;
				return (
					<FormControlLabel
						key={value[0]}
						id={labelId}
						control={<Checkbox />}
						label={value[1][0]}
						labelPlacement="start"
						onChange={handleToggle(value[0])}
						data-cy={`food-${index}`}
					/>
				);
			})}
			<FormControlLabel
				key={numFoods + 1}
				id={`checkbox-list-secondary-label-${numFoods + 1}`}
				control={<Checkbox />}
				label={
					<TextField
						placeholder="Other"
						variant="standard"
						size="small"
						onBlur={(ev) => {
							setOtherName(ev.target.value);
						}}
					/>
				}
				labelPlacement="start"
				onChange={handleToggle(numFoods + 1)}
			/>
		</FormGroup>
	);
};

export default Checklist;
