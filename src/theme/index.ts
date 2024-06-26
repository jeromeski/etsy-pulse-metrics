import { createTheme } from "@mui/material";
import { PaletteOptions, TypeText } from "@mui/material/styles/createPalette";
import { TypographyOptions } from "@mui/material/styles/createTypography";

interface CustomTypeText extends TypeText {
	regular: string;
	bold: string;
	medium: string;
	light: string;
	label: string;
}

interface CustomGreyColors {
	100: string;
	200: string;
	300: string;
	400: string;
	500: string;
	600: string;
	700: string;
	800: string;
	900: string;
}

interface CustomPaletteOptions extends PaletteOptions {
	text: CustomTypeText;
	grey: CustomGreyColors;
}

interface CustomFontWeights {
	body: number;
	heading: number;
	thin: number;
	light: number;
	regular: number;
	medium: number;
	bold: number;
	bolder: number;
}

interface CustomTypographyOptions extends TypographyOptions {
	fontWeight: CustomFontWeights;
}

const defaultTheme = createTheme({
	palette: {
		grey: {
			100: "#f9f9f9",
			200: "#F7F7F7",
			300: "#f4f4f4",
			400: "#F3F3F3",
			500: "#f1f1f1", // border alt color
			600: "#EdEdEd",
			700: "#E6E6E6", // border color
			800: "#C2C3CC",
			900: "#bdbdbd"
		} as CustomGreyColors,
		text: {
			bold: "#0D1136", // heading color
			medium: "#424561",
			regular: "#77798C", // regular text color
			light: "#909090",
			label: "#767676"
		} as CustomTypeText
	} as CustomPaletteOptions

	// You can also customize typography, breakpoints, and other theme aspects here
});

export default defaultTheme;
