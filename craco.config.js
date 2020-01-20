const {whenDev} = require("@craco/craco");

module.exports = {
    babel: {
        plugins: [...whenDev(() => ["react-hot-loader/babel"], [])]
    },
    webpack: {
        alias: whenDev(() => ({"react-dom": "@hot-loader/react-dom"}), {})
    }
};
