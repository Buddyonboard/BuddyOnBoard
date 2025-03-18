import FooterSection from '@/components/Layout/FooterSection';
import HeaderSection from '@/components/Layout/HeaderSection';

export default function MainLayout({ children }) {
	return (
		<>
			<HeaderSection />
			<main className="flex-1 md:p-6 p-4">{children}</main>
			<FooterSection />
		</>
	);
}
