import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

export async function Set(key: string, value: string): Promise<void> {
  await localStorage.setItem(key, JSON.stringify(value));
}


export async function get(key: string): Promise<any> {
  const item = await localStorage.getItem(key);
  if(!item) return false;
  return JSON.parse(item);
}

export async function remove(key: string): Promise<void> {
  await Storage.remove({
    key: key,
  });
}

export async function update(key: string): Promise<any> {
  const item = await localStorage.getItem(key);
  if(!item) return false;
  return JSON.parse(item);
}



