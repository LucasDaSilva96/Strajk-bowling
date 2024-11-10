import { z } from 'zod';

export const bookingSchema = z.object({
  when: z.date(),
  lanes: z.number().min(1),
  people: z.number().min(1),
  shoes: z.array(z.number().min(10)),
});
