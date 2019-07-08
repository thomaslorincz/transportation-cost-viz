const context = require.context(__dirname, true, /test\.js$/);
context.keys().forEach(context);
module.exports = context;
