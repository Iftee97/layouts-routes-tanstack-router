export const isLocal = process.env.NODE_ENV === "development";

export const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));
