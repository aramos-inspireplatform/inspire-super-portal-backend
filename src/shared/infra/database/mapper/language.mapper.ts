import { Language } from '~/languages/domain/entity/language.entity';
import { Languages } from '~/shared/infra/database/entities';
import { Mapper } from '~/shared/infra/database/mapper/mapper';

export const LanguageMapperToDomain = (model: Languages) =>
  Mapper(
    model,
    (model) =>
      new Language({
        id: model.id,
        name: model.name,
        nativeName: model.nativeName,
        isoCode: model.isoCode,
      }),
  );
