export const validateEmail = (email: string) => {
  // const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  return expression.test(email);
};

export const formatDisplayTimeHMS = (wSeconds: number) => {
  const hours: number = Math.floor((wSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes: number = Math.floor((wSeconds % (60 * 60)) / 60);
  const seconds: number = Math.floor(wSeconds % 60);
  return (
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds)
  );
};
