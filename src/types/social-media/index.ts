export interface SimpleSocMedCardMetrics {
	id?: string;
	title: string | undefined;
	keyMetricValue: string | undefined;
	growth?: string;
	likesComparisonDays?: string;
}

export interface BasicSocMedOverviewData extends SimpleSocMedCardMetrics {
	iconURL: string | undefined;
}
