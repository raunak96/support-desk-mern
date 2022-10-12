// this function wraps around async function and allows us to use async await otherwise we need to use then.catch
const wrap =
	fn =>
	(...args) =>
		fn(...args).catch(args[2]);

export default wrap;
