import { useEffect, useState } from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

type User = {
	id: number;
	name: string;
};

const filterOptions = createFilterOptions<User>({
	limit: 6000,
});

type Props = {
	onSelectUser: (userId: number) => void;
};

const UserSearchBar = ({ onSelectUser }: Props) => {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		async function fetchUsers() {
			const res = await fetch("http://localhost:4243/user/friends", {
				method: "GET",
				credentials: "include",
			});

			const result = await res.json();
			// expected: [{ id, name }]
			setUsers(Array.isArray(result) ? result : []);
		}

		fetchUsers();
	}, []);

	return (
		<Autocomplete<User>
			sx={{ width: "25%" }}
			options={users}
			filterOptions={filterOptions}
			getOptionLabel={(option) => option.name}
			onChange={(_, value) => {
				if (value) {
					onSelectUser(value.id);
				}
			}}
			isOptionEqualToValue={(option, value) =>
				option.id === value.id
			}
			slotProps={{
				listbox: {
					sx: { maxHeight: 300 },
				},
			}}
			renderInput={(params) => (
				<TextField
					{...params}
					placeholder="Search friend to chat..."
					size="small"
					sx={{
						"& .MuiOutlinedInput-root": {
							backgroundColor: "var(--color-tertiary)",
							"& fieldset": {
								borderColor: "var(--color-primary)",
							},
							"&:hover fieldset": {
								borderColor: "var(--color-secondary)",
							},
							"&.Mui-focused fieldset": {
								borderColor: "var(--color-secondary)",
							},
						},
						borderRadius: 10,
					}}
				/>
			)}
		/>
	);
};

export default UserSearchBar;