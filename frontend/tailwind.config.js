/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
	theme: {
		extend: {
			screens: {
				mobile: '360px',
				tablet: '641px',
				laptop: '1025px',
				desktop: '1440px'
			}
		}
	},
	plugins: []
};
