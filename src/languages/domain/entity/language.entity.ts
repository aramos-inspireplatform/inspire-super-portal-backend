import { InstanceProperties } from '~/shared/types/class-properties.type';

export class Language {
  id: string;

  name: string;

  nativeName: string;

  isoCode: string;

  constructor(attrs: InstanceProperties<Language>) {
    this.id = attrs.id;
    this.name = attrs.name;
    this.nativeName = attrs.nativeName;
    this.isoCode = attrs.isoCode;
  }
}
