import { z } from 'zod'

export const FacultySchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  banner: z.string(),
  subtitle: z.string(),
  text: z.string(),
  subtext: z.string(),
  programCount: z.number(),
  educationLevel: z.array(z.number()),
  documentCollections: z.array(
    z.object({
      name: z.string(),
      documentCollectionItems: z.array(
        z.object({
          name: z.string(),
          document: z.string(),
        })
      ),
    })
  ),
})
