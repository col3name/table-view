export type SomePartial<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<PropertyKey, any>,
  PartialKeys extends keyof T,
> = Omit<T, PartialKeys> & { [Key in PartialKeys]+?: T[Key] };
