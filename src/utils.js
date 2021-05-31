export const randomizeArray = (array) => array.sort(() => Math.random() - 0.5);

export const randomNumberInRange = (min, max) => Math.floor(Math.random() * (max - min) + min);
