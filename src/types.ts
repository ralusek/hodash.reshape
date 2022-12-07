export type Mapping<
  I extends Record<string, any>,
  O extends Record<string, any>,
> = {
  [K in keyof O]: string | ((input: I) => O[K]);
};