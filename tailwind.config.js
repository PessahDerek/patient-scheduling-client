/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'background': {
                    DEFAULT: "#F5F5FD"
                },
                'secondary': {
                    DEFAULT: '#164523',
                    50: '#81D799',
                    100: '#6BD087',
                    200: '#41C265',
                    300: '#319A4E',
                    400: '#247039',
                    500: '#164523',
                    600: '#103219',
                    700: '#0A1E0F',
                    800: '#040B06',
                    900: '#000000',
                    950: '#000000'
                },
                'primary': {
                    DEFAULT: '#1098F7',
                    50: '#FFFFFF',
                    100: '#E9F6FE',
                    200: '#B3DEFC',
                    300: '#7DC7FB',
                    400: '#46AFF9',
                    500: '#1098F7',
                    600: '#088AE6',
                    700: '#077CCD',
                    800: '#066DB4',
                    900: '#055E9C',
                    950: '#05568F'
                },
                'accent': {
                    DEFAULT: '#5603AD',
                    50: '#D5AFFE',
                    100: '#C793FD',
                    200: '#AA5CFC',
                    300: '#8E25FB',
                    400: '#7104E4',
                    500: '#5603AD',
                    600: '#4A0394',
                    700: '#3D027B',
                    800: '#310262',
                    900: '#240149',
                    950: '#1E013C'
                },
                'red': {
                    DEFAULT: '#EF3E36',
                    50: '#FFFFFF',
                    100: '#FFFFFF',
                    200: '#FBD4D2',
                    300: '#F7A29E',
                    400: '#F3706A',
                    500: '#EF3E36',
                    600: '#ED271E',
                    700: '#E01B12',
                    800: '#C91810',
                    900: '#B1150E',
                    950: '#A5140D'
                },
            }
        },
    },
    plugins: [],
}

