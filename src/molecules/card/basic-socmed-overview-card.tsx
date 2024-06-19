// React Imports
import React from "react";

// **Mui Imports
import { Card, Box, Typography, styled, Grid } from "@mui/material";

// **Data Imports
import { SIMPLE_SOCMED_CARD_METRICS } from "@/data";

// **Type Imports
import { BasicSocMedOverviewData } from "@/types/social-media";

const StyledImage = styled("img")({
	height: "auto",
	width: "50px"
});

const BasicSocmedOverviewItem: React.FC<BasicSocMedOverviewData> = ({
	iconURL,
	title,
	keyMetricValue
}) => {
	return (
		<Grid item>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					width: "150px"
				}}>
				<Box sx={{ marginBottom: ".75rem" }}>
					<StyledImage src={iconURL} />
				</Box>
				<Box>
					<Typography variant="h4" sx={{ fontWeight: "900", fontSize: "2.125rem" }}>
						{Number(keyMetricValue).toLocaleString()}
					</Typography>
				</Box>
				<Box>
					<Typography
						variant="body2"
						sx={{ fontSize: ".75rem", fontWeight: "900", color: "#6E6E6E", letterSpacing: "1px" }}>
						{title}
					</Typography>
				</Box>
			</Box>
		</Grid>
	);
};

const BasicSocMedOverviewCard = () => {
	return (
		<>
			<Card sx={{ padding: "1rem 1rem 2rem 1rem", borderRadius: "10px" }}>
				<Typography
					variant="h6"
					sx={{
						fontSize: "1rem",
						fontWeight: "900",
						color: "#6E6E6E",
						letterSpacing: "1px",
						marginBottom: "2rem"
					}}>
					Social Media Followers
				</Typography>
				<Grid container spacing={5} sx={{ justifyContent: "center" }}>
					{SIMPLE_SOCMED_CARD_METRICS ? (
						SIMPLE_SOCMED_CARD_METRICS?.map((item) => (
							<BasicSocmedOverviewItem
								key={item.id}
								iconURL={item.iconURL}
								title={item.title}
								keyMetricValue={item.keyMetricValue}
							/>
						))
					) : (
						<></>
					)}
				</Grid>
			</Card>
		</>
	);
};

export default BasicSocMedOverviewCard;
