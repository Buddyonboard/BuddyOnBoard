import UpcomingTripsCard from './DashboadCards/UpcomingTripsCard';
import BuddyRequestsCard from './DashboadCards/BuddyRequestsCard';
import ActiveListingsCard from './DashboadCards/ActiveListingsCard';
import ManagePaymentsCard from './DashboadCards/ManagePaymentsCard';
import HelpCard from './DashboadCards/SupportSectionCards/HelpCard';
import ReportIssueCard from './DashboadCards/SupportSectionCards/ReportIssueCard';
import SubmitServiceRequestCard from './DashboadCards/SupportSectionCards/SubmitServiceRequestCard';

export default function DashboardTabContent({
	upcomingTrip,
	buddyRequests,
	activeListings,
	hasData
}) {
	return (
		<>
			{/******************** Dashboard Section *********************/}
			<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 grid-rows-1">
				<div className="flex flex-col justify-between max-lg:gap-3">
					{/************ Upcoming Trip Card *************/}
					<UpcomingTripsCard hasData={hasData} upcomingTrip={upcomingTrip} />

					{/************ Manage Payment Card *************/}
					<ManagePaymentsCard />
				</div>

				{/************* Buddy Requests Card *************/}
				<BuddyRequestsCard hasData={hasData} buddyRequests={buddyRequests} />

				{/************* Active Listings Card *************/}
				<ActiveListingsCard hasData={hasData} activeListings={activeListings} />
			</div>

			{/******************** Support Section ********************/}
			<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
				<HelpCard />

				<ReportIssueCard />

				<SubmitServiceRequestCard />
			</div>
		</>
	);
}
