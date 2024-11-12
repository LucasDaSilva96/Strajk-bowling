import { z } from 'zod';

export const bookingSchema = z.object({
  when: z.date(),
  time: z.number().or(z.string()),
  lanes: z.string().min(1),
  people: z.string().min(1),
  shoes: z.number(),
});
