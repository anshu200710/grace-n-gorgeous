import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'tg7pzdn2', // Your Sanity Project ID
  dataset: 'production',
  useCdn: false,          // Setting this to false ensures posts show up INSTANTLY when you click publish
  apiVersion: '2026-05-20',
})