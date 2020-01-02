export type Store = {
  active: boolean;
  viewport: {
    width: number,
    height: number,
  },
};

export type Activate = {
  payload: {
    active: boolean;
  }
};

export type Resize = {
  payload: {
    width: number;
    height: number;
  }
};
