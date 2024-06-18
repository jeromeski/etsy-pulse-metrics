import { createTheme } from "@mui/material";

const defaultTheme = createTheme({
	palette: {
		primary: {
			main: "#556cd6"
		},
		secondary: {
			main: "#19857b"
		},
		error: {
			main: "#ff0000"
		},
		background: {
			default: "#F2F2F2"
		}
	}
	// You can also customize typography, breakpoints, and other theme aspects here
});

export default defaultTheme;
