export type IMapper<TDomain = any, Model = any> = {
  domainToModel(domain: TDomain): Model;
  modelToDomain(model: Model): TDomain;
};
