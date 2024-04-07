/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Indica ao Tailwind onde procurar por classes
    "./components/**/*.{js,ts,jsx,tsx}", // Inclua este caminho se você tiver uma pasta de componentes
  ],
  theme: {
    extend: {}, // Aqui você pode estender o tema padrão do Tailwind
  },
  plugins: [], // Plugins do Tailwind podem ser adicionados aqui
}


