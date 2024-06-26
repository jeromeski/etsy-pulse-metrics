// **React Imports
import React, { ReactNode } from "react";

// **MUI imports
import { styled } from "@mui/styles";
import { Box, BoxProps, Theme } from "@mui/material";

const BlankLayoutWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "#f3f5fc !important",
	minHeight: "100vh",
	width: "100%"
}));

const BlankLayout = ({ children }: any) => {
	return (
		<Box
			sx={(theme) => ({
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: theme.palette.grey[400],
				minHeight: "100vh",
				width: "100%"
			})}>
			{children}
		</Box>
	);
};

export default BlankLayout;
