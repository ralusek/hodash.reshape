// Types
import { Mapping } from './types';

// Utils
import get from './utils/get';

export default function reshape<
  I extends Record<string, any>,
  O extends Record<string, any>,
>(
  mapping: Mapping<I, O>,
) {
  return (input: I) => {
    return Object.keys(mapping).reduce((output: O, key: keyof O) => {
      if (typeof mapping[key] === 'string') {
        const inputKey = mapping[key] as keyof I;
        const value = get(input, inputKey as string);
        // @ts-ignore
        output[key] = value;
      }
      else if(typeof mapping[key] === 'function') {
        // @ts-ignore
        const result = mapping[key](input);
        output[key] = result;
      }
      else throw new Error('Unrecognized mapping type. Expected either string or function.');
      
      return output;
    }, {} as O);
  };
}
