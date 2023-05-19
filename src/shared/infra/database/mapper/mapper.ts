export type IMapper<
  TDomain = any,
  Model = any,
  TAdditionalDomainToModel = any,
> = {
  domainToModel(domain: TDomain, additional?: TAdditionalDomainToModel): Model;
  modelToDomain(model: Model): TDomain;
};
