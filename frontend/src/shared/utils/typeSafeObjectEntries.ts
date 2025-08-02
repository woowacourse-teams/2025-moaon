type Object = Record<string, unknown>;
type ObjectEntries<T extends Object> = Array<[keyof T, T[keyof T]]>;

export const typeSafeObjectEntries = <T extends Object>(
  object: T
): ObjectEntries<T> => {
  return Object.entries(object) as ObjectEntries<T>;
};
