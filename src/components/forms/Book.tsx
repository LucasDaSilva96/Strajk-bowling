import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, useFormState } from 'react-hook-form';
import { bookingSchema } from '../../schema/booking';
import { z } from 'zod';
import { addHours, format, isBefore } from 'date-fns';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { Calendar } from '../ui/calendar';
import { Input } from '../ui/input';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

// Define the props for the form
type FormProps = {
  onSubmit: (values: z.infer<typeof bookingSchema>) => Promise<void>;
  shoesArray: number[];
  setShoesArray: React.Dispatch<React.SetStateAction<number[]>>;
  isLoading: boolean;
};

export default function Book({
  onSubmit,
  shoesArray,
  isLoading,
  setShoesArray,
}: FormProps) {
  // This will create a form with the default values and the schema
  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      when: new Date(),
      time: format(addHours(new Date(), 1), 'HH:mm'),
      lanes: '1',
      people: '1',
      shoes: 0,
    },
  });

  const { errors } = useFormState({ control: form.control });
  const [disabled, setDisabled] = useState(false);

  // Function to adjust the number of lanes based on the number of people
  function adjustTheNumberOfLanes() {
    const people = Number(form.getValues('people'));
    const lanes = Number(form.getValues('lanes'));
    // Calculate the number of lanes needed based on the number of people
    const nr_of_lanes = Math.ceil(people / 4).toString();

    // This will create an array of 0s with the length of the number of people
    setShoesArray(Array.from({ length: people }, () => 0));

    // If the number of people is greater than the number of lanes, update the number of lanes
    if (people / 4 > lanes) {
      form.setError('lanes', {
        type: 'manual',
        message: `You need at least ${nr_of_lanes} lanes for the selected number of players.🎳`,
      });
      return;
    }

    // If the number of lanes is greater than the number of people, update the number of lanes to the number of people
    // and show a toast message
    if (lanes > people) {
      form.setError('lanes', {
        type: 'manual',
        message: `You can only book a maximum of ${people} ${
          people > 1 ? 'lanes' : 'lane'
        } for the selected amount of players.🎳`,
      });
      return;
    }

    form.clearErrors('lanes');
  }

  // Function to adjust the time based on the current time
  function adjustTime() {
    const time = form.getValues('time');
    const date = form.getValues('when');
    const now = addHours(new Date(), 1);
    const selected = new Date(`${format(date, 'yyyy-MM-dd')}T${time}`);
    if (isBefore(selected, now)) {
      toast.error('Please select a future time (at least an hour from now).🕰️');
      form.setValue('time', format(now, 'HH:mm'));
    }
  }

  // Function to handle the shoe size change
  const handleShoesChange = (index: number, value: string) => {
    const newShoesArray = shoesArray.map((shoe, i) =>
      i === index ? Number(value) : shoe
    );
    setShoesArray(newShoesArray);
  };

  useEffect(() => {
    if (form.formState.errors.lanes) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [form.formState.errors.lanes]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='min-w-[375px] max-w-md flex flex-col items-center gap-3'
      >
        <div className='flex w-full justify-between'>
          {/* Calendar */}
          <FormField
            control={form.control}
            name='when'
            render={({ field }) => (
              <FormItem className='flex flex-col self-end relative'>
                <FormLabel className='absolute bg-[#FFF4F1] -top-0.2 left-[5%] z-10 px-1 text-xs text-[#441D81]'>
                  DATE
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          `w-[240px] pl-3 text-left font-semibold text-xl border-2 ${
                            errors.time
                              ? 'border-[#EC315A]'
                              : 'border-[#441D81]'
                          } bg-[#FFF4F1]`,
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'dd MMM')
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className='w-auto p-0 bg-white z-20'
                    align='start'
                  >
                    <Calendar
                      mode='single'
                      selected={
                        field.value ? new Date(field.value) : new Date()
                      }
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className='sr-only'>
                  The date is used to book a lane.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Time picker */}
          <FormField
            control={form.control}
            name='time'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormLabel
                  htmlFor='time'
                  className='absolute bg-[#FFF4F1] -top-0.2 left-[5%] z-10 px-1 text-xs text-[#441D81]'
                >
                  TIME
                </FormLabel>
                <FormControl onChange={adjustTime}>
                  <Input
                    {...field}
                    type='time'
                    id='time'
                    name='time'
                    className='w-full border-2 rounded-sm py-3 px-4 border-[#441D81] !text-xl bg-[#FFF4F1] font-bold'
                  />
                </FormControl>
                <FormDescription className='sr-only'>
                  This is the time you want to book a lane.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='people'
          render={({ field }) => (
            <FormItem className='w-full relative'>
              <FormLabel
                htmlFor='people'
                className='absolute bg-[#FFF4F1] -top-0.2 left-[5%] z-10 px-1 text-xs text-[#441D81]'
              >
                Number of awesome bowlers
              </FormLabel>
              <FormControl onChange={() => adjustTheNumberOfLanes()}>
                <Input
                  {...field}
                  type='number'
                  name='people'
                  id='people'
                  className={`w-full border-2 rounded-sm py-3 px-4 ${
                    errors.people ? 'border-[#EC315A]' : 'border-[#441D81]'
                  } !text-xl bg-[#FFF4F1] font-bold`}
                  min={1}
                />
              </FormControl>
              <FormDescription className='sr-only'>
                This is the amount of people you want to book for.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='lanes'
          render={({ field }) => (
            <FormItem className='w-full relative'>
              <FormLabel
                htmlFor='lanes'
                className={`absolute bg-[#FFF4F1] -top-0.2 left-[5%] z-10 px-1 text-xs ${
                  errors.lanes ? 'text-[#EC315A]' : 'text-[#441D81]'
                } `}
              >
                Number of Lanes
              </FormLabel>
              <FormControl onChange={adjustTheNumberOfLanes}>
                <Input
                  {...field}
                  type='number'
                  name='lanes'
                  id='lanes'
                  min={1}
                  className={`w-full border-2 rounded-sm py-3 px-4  ${
                    errors.lanes
                      ? 'border-[#EC315A] text-[#EC315A]'
                      : 'border-[#441D81] text-black'
                  } !text-xl bg-[#FFF4F1] font-bold`}
                />
              </FormControl>
              <FormDescription className='sr-only'>
                This is the amount of lanes you want to book.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='w-full flex items-center uppercase font-semibold text-[#441D81] text-lg justify-center gap-1'>
          <div className='p-[0.5px]  min-w-[40%] bg-[#441D81]' />
          <span>SHOES</span>
          <div className='p-[0.5px] min-w-[40%] bg-[#441D81]' />
        </div>

        <div className='w-full h-[150px] py-1 overflow-y-auto -mt-3 px-1'>
          {shoesArray.map((_, index) => (
            <FormField
              key={index}
              control={form.control}
              name='shoes'
              render={({ field }) => (
                <FormItem className='w-full relative'>
                  <FormLabel
                    htmlFor={`shoes-${index}`}
                    className='absolute bg-[#FFF4F1] -top-2 left-[5%] z-10 px-1 text-xs text-[#441D81]'
                  >
                    Shoe size / person {index + 1}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      name={`shoes-${index}`}
                      id={`shoes-${index}`}
                      className={`w-full border-2 rounded-sm py-3 px-4 ${
                        errors.shoes ? 'border-[#EC315A]' : 'border-[#441D81]'
                      } !text-xl bg-[#FFF4F1] font-bold`}
                      min={21}
                      value={shoesArray[index]}
                      onChange={(e) => handleShoesChange(index, e.target.value)}
                    />
                  </FormControl>
                  <FormDescription className='sr-only'>
                    This is the shoe size for the bowler.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <button
          disabled={isLoading || disabled}
          className='bg-[#EC315A] text-white font-bold text-2xl uppercase p-2 w-full rounded-sm mt-auto'
          type='submit'
        >
          {isLoading ? 'Loading...' : 'strIIIIIike!'}
        </button>
      </form>
    </FormProvider>
  );
}
