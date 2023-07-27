type Params = Parameters<typeof fetch>;

export default async function client(...params: Params) {
  const res = await fetch(...params);
  if (!res.ok) throw new Error(res.statusText);
  return res;
}
