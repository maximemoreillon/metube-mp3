export default defineEventHandler(async (event) => {
  const { url } = await readBody(event);

  if (typeof url !== "string" || !url.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: "A URL is required",
    });
  }

  const config = useRuntimeConfig(event);

  return await $fetch("/add", {
    baseURL: config.metubeBaseUrl,
    method: "POST",
    body: {
      url,
      download_type: "audio",
      format: "mp3",
      quality: "best",
    },
  });
});
