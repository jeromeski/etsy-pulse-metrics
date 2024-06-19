// **Mui Imports
import { styled } from "@mui/material/styles";
import { Card, Box, Typography } from "@mui/material";
import { TrendingDown, TrendingUp } from "@mui/icons-material";

interface BasicMetricCardsProps {
	title: string;
	keyMetricValue: string;
	likesComparisonDays: string;
	growth: string;
}

const StyledCard = styled(Card)({
	height: "auto",
	display: "flex",
	flexDirection: "column",
	padding: "1rem",
	width: "15rem",
	borderRadius: "10px",
	margin: ".5rem"
});

const BasicMetricsCard = ({
	title,
	keyMetricValue,
	likesComparisonDays,
	growth
}: BasicMetricCardsProps) => {
	return (
		<StyledCard>
			<Box sx={{ marginBottom: "2rem" }}>
				<Typography variant="body1" sx={{ fontWeight: "600", color: "#6E6E6E" }}>
					{title}
				</Typography>
			</Box>
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
				<Typography variant="h4" sx={{ fontWeight: "900" }}>
					{Number(keyMetricValue).toLocaleString()}
				</Typography>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					fontWeight: "700",
					marginBottom: "2rem"
				}}>
				<Typography
					variant="body1"
					sx={{ display: "inline-block", fontWeight: "700", color: "#6E6E6E" }}>
					<b>{growth}%</b>
				</Typography>
				{Number(growth) >= 0 ? <TrendingUp color="success" /> : <TrendingDown color="error" />}
			</Box>
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
				<Typography
					sx={{
						fontWeight: "600",
						fontSize: ".75rem",
						color: "#6E6E6E",
						letterSpacing: "1px"
					}}>
					vs previous {likesComparisonDays} days
				</Typography>
			</Box>
		</StyledCard>
	);
};

export default BasicMetricsCard;
