import got from "got";

export const baseApiClient = got.extend({
  retry: {
    limit: 3,
  },
});
