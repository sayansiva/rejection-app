export const asyncPipe = (...fns) => val =>
  fns.reduce(async (acc, curr) => curr(await acc), val);
