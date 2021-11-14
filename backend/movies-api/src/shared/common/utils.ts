export function createQueryParamsString(paramsObject: any): string {
  return Object.keys(paramsObject)
    .map((x) => `${x}=${paramsObject[x]}`)
    .join('&');
}
