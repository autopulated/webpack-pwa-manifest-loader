export default function loader() {
  return `module.exports = require(${JSON.stringify(this.utils.contextify(this.context, this.remainingRequest))});`;
};
