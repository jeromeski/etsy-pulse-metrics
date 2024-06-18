// **Mui Imports
import { Box } from "@mui/material";
import BasicMetricsCard from "@/molecules/card/basic-metrics-card";

const metrics = [
	{
		id: "1abc",
		title: "Post Likes",
		keyMetricValue: "5187",
		growth: "9.7",
		likesComparisonDays: "30"
	},
	{
		id: "2bcd",
		title: "Page Reach",
		keyMetricValue: "10304",
		growth: "-3.5",
		likesComparisonDays: "30"
	},
	{
		id: "3cde",
		title: "Retweets",
		keyMetricValue: "142",
		growth: "1.2",
		likesComparisonDays: "30"
	},
	{
		id: "4def",
		title: "Followers",
		keyMetricValue: "8431",
		growth: ".25",
		likesComparisonDays: "30"
	}
];

const Home = () => {
	return (
		<>
			<Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
				{metrics.map((item) => (
					<BasicMetricsCard
						key={item.id}
						title={item.title}
						keyMetricValue={item.keyMetricValue}
						growth={item.growth}
						likesComparisonDays={item.likesComparisonDays}
					/>
				))}
			</Box>
		</>
	);
};

export default Home;
