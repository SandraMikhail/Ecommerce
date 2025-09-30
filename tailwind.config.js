/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [  "./src/**/*.{html,ts}",
    "../node_modules/flowbite"
  ],
  theme: {
    extend: {},
  },
  plugins:
 [require('flowbite/plugin')],
}
