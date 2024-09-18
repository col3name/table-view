import { AddressModel } from './model';

export const toMap = (values: Array<AddressModel>) => {
  return values.reduce((acc: Map<string, AddressModel>, it) => {
    if (!acc.has(it.id)) {
      acc.set(it.id, it);
    }
    return acc;
  }, new Map<string, AddressModel>());
};
