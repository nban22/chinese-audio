require('ts-node/register');

(async () => {
  const config = (await import('./src/config/database.ts'));
  module.exports = config.default || config; // Nếu dùng `export default`
})();