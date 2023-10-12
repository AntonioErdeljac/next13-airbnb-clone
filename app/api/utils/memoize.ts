type GenericFunction<T extends any[], U> = (...args: T) => Promise<U>;

export const memoize = <T extends any[], U>(
  fn: GenericFunction<T, U>,
  interval: number
): GenericFunction<T, U> => {
  const cache: Record<string, { value: U; lastCalculated: number }> = {};

  return async (...args: T): Promise<U> => {
    const key = JSON.stringify(args);
    if (!cache[key] || cache[key].lastCalculated + interval < Date.now()) {
      cache[key] = { value: await fn(...args), lastCalculated: Date.now() };
    }
    return cache[key].value;
  };
};
