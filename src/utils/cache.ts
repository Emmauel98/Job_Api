import redis from "../config/redis";

export const cacheData = async (key: string, data: any, ttlSeconds = 300) => {
  await redis.set(key, JSON.stringify(data), "EX", ttlSeconds);
};

export const getCachedData = async (key: string) => {
  const cached = await redis.get(key);
  return cached ? JSON.parse(cached) : null;
};

export const clearCache = async (key: string) => {
  await redis.del(key);
};