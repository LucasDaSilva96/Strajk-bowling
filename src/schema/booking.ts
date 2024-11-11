import { z } from 'zod';

export const bookingSchema = z
  .object({
    when: z.date(),
    time: z.number().or(z.string()),
    lanes: z.string().min(1),
    people: z.string().min(1),
    shoes: z.string().min(1).or(z.number()),
  })
  .refine((data) => Number(data.shoes) >= 10, {
    message: 'The number of shoes must be greater than 10',
    path: ['shoes'],
  });
