/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './layout/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                'pt-sans': ['PT Sans', 'sans-serif']
            },
            screens: {
                md2: '868px'
            }
        }
    },
    plugins: []
}
