export default function get(obj: any, path: string) {
  const bc = path.split('.');

  let current = obj[bc[0]];
  for (let i = 1; i < bc.length; i++) {
    current = current[bc[i]];
    if (current === undefined) break;
  }

  return current;
}
