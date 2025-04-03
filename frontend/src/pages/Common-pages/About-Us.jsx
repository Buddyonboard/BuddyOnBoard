export default function AboutUs() {
	return (
		<div className="md:px-6 px-2 py-4">
			<h1 className="font-bold md:text-5xl text-4xl">About Us</h1>
			<br />
			<p>
				At <strong>Buddy On Board</strong>, we believe that travel is not just about
				reaching your destination—it’s about doing so stress-free. Whether you’re
				looking for a trusted companion to make your journey easier or an affordable
				way to send items across cities or countries, we’re here to make it happen.
			</p>
			<br />
			<p>
				Our platform connects travelers—whether it’s for companionship or courier
				services while prioritizing safety, flexibility, and convenience. By
				leveraging advanced technology to match the users, automated identity
				verification, and intuitive filters, we ensure that every connection is
				safe, dependable, and aligned with your needs.
			</p>

			<br />

			<div>
				{/* Our Mission */}
				<h2 className="text-2xl font-bold mb-4">Our Mission</h2>
				<div>
					<p className="mb-2">
						To create a reliable, people-to-people network that supports travelers in
						connecting with companions and simplifying deliveries. We aim to provide a
						safe and practical platform that helps make travel experiences smoother
						and stress-free.
					</p>
				</div>

				<br />

				{/* Why Choose Us */}
				<div>
					<h2 className="text-xl font-semibold mb-4">Why Choose Us?</h2>

					<ul className="list-disc pl-6 space-y-2">
						<li>
							<strong>Verified Users:</strong> All users undergo ID verification to
							create a safe and secure platform.
						</li>
						<li>
							<strong>Tailored Matches:</strong>Flexible filters help you find
							companions or couriers based on preferences like language, gender, or
							age.
						</li>
						<li>
							<strong>Effortless Coordination:</strong> In app messaging and
							notification systems makes it easy to connect and coordinate with
							companions or couriers at your convenience, ensuring smooth and
							stress-free planning.
						</li>
						<li>
							<strong>Cost-Effective Solutions: </strong> Peer-to-peer deliveries save
							time and money compared to traditional services.
						</li>
					</ul>
				</div>

				<br />

				{/* Who We Serve */}
				<div>
					<h2 className="text-xl font-semibold mb-4">Who We Serve</h2>

					<ul className="list-disc pl-6 space-y-2">
						<li>
							<strong>Travelers Seeking Companions:</strong> Whether you're traveling
							alone or looking for support during your journey, our platform helps you
							find reliable companions who match your preferences, making your travel
							experience stress-free and enjoyable.
						</li>
						<li>
							<strong>Individuals Sending Items: </strong>If you need to send documents
							or permissible items, we connect you with verified travelers heading to
							your destination, providing a cost-effective and efficient alternative to
							traditional courier services.
						</li>
						<li>
							<strong>Buddy Services: </strong>For those willing to offer buddy
							services, our platform provides an opportunity to assist others by
							offering Travel Buddy or Courier Buddy services, all while earning extra
							money during your travels.
						</li>
					</ul>
				</div>
			</div>

			<br />

			<div>
				<p className="text-gray-700">
					At Buddy On Board, we’re more than just a platform—we’re a community of
					explorers, facilitators, and problem-solvers. Together, we’re redefining
					the way people travel and send items across the globe.
				</p>
			</div>

			<br />

			<div>
				<h2 className="text-2xl font-bold mb-4">
					Join us today and experience a smarter, stress-free way to travel—together!
				</h2>
			</div>
		</div>
	);
}
