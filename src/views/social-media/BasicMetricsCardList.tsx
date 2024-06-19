// **MUI Imports
// **React Imports
import React from "react";
import { Box } from "@mui/material";
// **Custom Components Imports
import BasicMetricsCard from "@/molecules/card/basic-metrics-card";
// **Data Imports
import { SIMPLE_SOCMED_CARD_METRICS } from "@/data";

const BasicMetricsCardList = () => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "space-around",
				alignItems: "center",
				flexWrap: "wrap"
			}}>
			{SIMPLE_SOCMED_CARD_METRICS.map((item) => (
				<BasicMetricsCard
					key={item.id}
					title={item.title}
					keyMetricValue={item.keyMetricValue}
					growth={item.growth}
					likesComparisonDays={item.likesComparisonDays}
				/>
			))}
		</Box>
	);
};

export default React.memo(BasicMetricsCardList);
