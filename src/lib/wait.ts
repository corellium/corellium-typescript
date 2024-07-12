/* eslint-disable compat/compat */
/* eslint-disable promise/avoid-new */

export const wait = async (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
