import { Instance, types } from "mobx-state-tree";

export const House = types.model({
  id: types.identifier,
  address: types.string,
});

export const Address = types.model({
  id: types.identifier,
  number: types.optional(types.number, 0),
  str_number: types.optional(types.string, ""),
  str_number_full: types.optional(types.string, ""),
  house: types.maybeNull(House),
});

export const Meter = types.model({
  area: Address,
  brand_name: types.maybeNull(types.string),
  communication: types.string,
  description: types.string,
  id: types.string,
  initial_values: types.array(types.number),
  installation_date: types.string,
  is_automatic: types.maybeNull(types.boolean),
  model_name: types.maybeNull(types.string),
  serial_number: types.maybe(types.string),
  _type: types.array(types.string),
});

export const ConfirmPopup = types.model({
  opened: types.boolean,
  data: types.maybeNull(types.string),
});

export type AddressModel = Instance<typeof Address>;
export type MeterModel = Instance<typeof Meter>;
