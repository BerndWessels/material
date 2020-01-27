// eslint-disable-next-line import/no-extraneous-dependencies
const { whenDev } = require("@craco/craco");

module.exports = {
  babel: {
    plugins: [
      ...whenDev(() => ["react-hot-loader/babel"], []),
      [
        "react-intl-auto",
        {
          removePrefix: true,
          includeExportName: true,
          includeDescription: true
        }
      ]
    ]
  },
  webpack: {
    alias: whenDev(() => ({ "react-dom": "@hot-loader/react-dom" }), {})
  }
};
