module.exports = {
  plugins: [
    'tailwindcss',
    'autoprefixer',
    // Import _utilities.scss trước nếu cần
    require('postcss-import')(),
    require('tailwindcss/nesting')(),
  ],
};
