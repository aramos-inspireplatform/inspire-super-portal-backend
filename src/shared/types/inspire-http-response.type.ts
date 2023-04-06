export type InspireHttpResponse<T = any> = {
  body: {
    data: T;
  };
};
