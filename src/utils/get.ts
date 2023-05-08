export default function get(obj: any, path: string | string[]) {
  const bc = Array.isArray(path) ? path : path.split('.');

  let current = obj[bc[0]];
  for (let i = 1; i < bc.length; i++) {
    current = current[bc[i]];
    if (current === undefined) break;
  }

  return current;
}
