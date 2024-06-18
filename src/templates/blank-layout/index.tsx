// **React Imports
import React, { ReactNode } from "react";

// **MUI imports
import { styled } from "@mui/styles";
import { Box, Theme } from "@mui/material";

const BlankLayoutWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: theme.palette.background.default,
	minHeight: "100vh",
	width: "100%"
}));

const BlankLayout = ({ children }: any) => {
	return <BlankLayoutWrapper>{children}</BlankLayoutWrapper>;
};

export default BlankLayout;
