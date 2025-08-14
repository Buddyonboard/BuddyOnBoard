import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import CONST from '@/utils/Constants';

export default function BookingPaymentStatusPopup({
	open,
	onClose,
	status,
	bookingId,
	renderTime
}) {
	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="2xl:max-w-4xl max-w-md p-0 gap-0 rounded-xl">
				<div className="p-6 space-y-6 mt-5">
					<DialogHeader>
						<DialogTitle className="2xl:text-5xl md:text-3xl text-xl text-center">
							{status == 'cancelled' && CONST.paymentStatus.failedStatusTitle}
						</DialogTitle>
					</DialogHeader>
					<div className="mt-2 text-center 2xl:text-2xl">
						{status == 'cancelled' && CONST.paymentStatus.failedStatusDescription}
					</div>
					<div className="flex flex-col space-y-4 2xl:text-2xl">
						<div className="flex flex-row justify-between">
							<p>Transaction ID</p>
							<p>#{bookingId}</p>
						</div>
						<div className="flex flex-row justify-between">
							<p>Time and date</p>
							<p>{renderTime}</p>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
