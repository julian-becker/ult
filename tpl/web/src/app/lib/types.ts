export type Store = {
  viewport: {
    width: number,
    height: number,
  },
};

export type Resize = {
  payload: {
    width: number;
    height: number;
  }
};
