import sanityClient from "@sanity/client";
export const client = sanityClient({
  projectId: process.env.PROJECT_ID,
  dataset: "production",
  apiVersion: "v1",
  token: process.env.SANITY_TOKEN,
  usecdn: false,
});
