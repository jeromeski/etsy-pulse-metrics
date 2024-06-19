// **Mui Imports
import { Box, Grid } from "@mui/material";
import BasicMetricsCardList from "@/views/social-media/BasicMetricsCardList";
import BasicSocMedOverviewCard from "@/molecules/card/basic-socmed-overview-card";

const Home = () => {
	return (
		<Grid container>
			<Grid item xs={6}>
				<BasicMetricsCardList />
			</Grid>
			<Grid item xs={5} spacing={3}>
				<BasicSocMedOverviewCard />
			</Grid>
		</Grid>
	);
};

export default Home;
