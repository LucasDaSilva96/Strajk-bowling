import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { bookingSchema } from '../schema/booking';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Calendar } from '../components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';
import { addHours, format, isBefore } from 'date-fns';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { catchError } from '../services/catchError';
import { postBooking } from '../services/api/post';
import { BookingRequest } from '../types/Booking';
import { useConfirmationStore } from '../store/confirmation';
import { useNavigate } from 'react-router-dom';

export default function Booking() {
  const { addBooking } = useConfirmationStore();
  const [shoesArray, setShoesArray] = useState([0]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      when: new Date(),
      time: format(addHours(new Date(), 1), 'HH:mm'),
      lanes: '1',
      people: '1',
      shoes: shoesArray[0],
    },
  });

  // Function to adjust the number of lanes based on the number of people
  function adjustTheNumberOfLanes(showToast?: boolean) {
    const people = Number(form.getValues('people'));
    const lanes = Number(form.getValues('lanes'));
    // Calculate the number of lanes needed based on the number of people
    const nr_of_lanes = Math.ceil(people / 4).toString();

    // This will create an array of 0s with the length of the number of people
    setShoesArray(Array.from({ length: people }, () => 0));

    // If the number of people is greater than the number of lanes, update the number of lanes
    if (people / 4 > lanes) {
      form.setValue('lanes', nr_of_lanes);
      if (showToast) {
        toast.error(
          `You need at least ${nr_of_lanes} lanes for the selected number of players.🎳`
        );
      }
      return;
    }

    if (lanes > people) {
      form.setValue('lanes', people.toString());
      if (showToast) {
        toast.error(
          `You can only book a maximum of ${people} lanes for the selected number of players.🎳`
        );
      }
      return;
    }
  }

  const handleShoesChange = (index: number, value: string) => {
    const newShoesArray = shoesArray.map((shoe, i) =>
      i === index ? Number(value) : shoe
    );
    setShoesArray(newShoesArray);
  };

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

  async function onSubmit(values: z.infer<typeof bookingSchema>) {
    // Getting the values from the form
    const { when, time, lanes, people } = values;
    // Creating the date string (yyyy-MM-ddTHH:mm) for the API
    const DATE = format(new Date(when), 'yyyy-MM-dd') + 'T' + time;
    // Creating the object to post to the API
    const postObject: BookingRequest = {
      when: DATE,
      lanes: Number(lanes),
      people: Number(people),
      shoes: shoesArray,
    };

    try {
      setIsLoading(true);

      const res = await postBooking(postObject);
      addBooking(res);
      toast.success('Booking successfully created!🎉');
      return setTimeout(() => navigate('/booking/confirmation'), 1000);
    } catch (error) {
      toast.error(catchError(error));
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <section className='w-full h-full flex flex-col items-center'>
      <div className='flex flex-col items-center gap-1 -mt-8'>
        <img
          src='/svgs/logo.svg'
          alt='logo'
          className='max-w-20 h-auto drop-shadow-lg'
        />
        <h1 className='text-[#EC315A] text-4xl font-bold uppercase drop-shadow'>
          Booking
        </h1>
      </div>

      <div className='w-[370px] flex items-center uppercase font-semibold text-[#441D81] text-lg justify-evenly'>
        <div className='p-[1px]  min-w-[20%] bg-[#441D81]' />
        <span>when,</span>
        <span>what & who</span>
        <div className='p-[1px] min-w-[20%] bg-[#441D81]' />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='min-w-[375px] max-w-md flex flex-col items-center gap-3 h-full'
        >
          <div className='flex w-full justify-between'>
            {/* Calendar */}
            <FormField
              control={form.control}
              name='when'
              render={({ field }) => (
                <FormItem className='flex flex-col self-end relative'>
                  <FormLabel className='absolute -top-0.5 left-[5%] opacity-90 text-sm text-[#441D81]'>
                    DATE
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal border-[1px] border-t-transparent',
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
                    <PopoverContent className='w-auto p-0' align='start'>
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
                  <FormLabel className='absolute -top-0.5 left-[10%] opacity-90 text-sm text-[#441D81]'>
                    TIME
                  </FormLabel>
                  <FormControl onChange={adjustTime}>
                    <Input
                      {...field}
                      type='time'
                      className='border-[1px] border-t-transparent'
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
                <FormLabel className='absolute -top-0.5 left-[5%] opacity-90 text-sm text-[#441D81]'>
                  Number of awesome bowlers
                </FormLabel>
                <FormControl onChange={() => adjustTheNumberOfLanes()}>
                  <Input
                    {...field}
                    type='number'
                    className='border-[1px] border-t-transparent'
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
                <FormLabel className='absolute -top-0.5 left-[5%] opacity-90 text-sm text-[#441D81]'>
                  Number of Lanes
                </FormLabel>
                <FormControl onChange={() => adjustTheNumberOfLanes(true)}>
                  <Input
                    {...field}
                    type='number'
                    className='border-[1px] border-t-transparent'
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

          <div className='w-full h-[200px] py-1 overflow-y-auto -mt-3 px-1'>
            {shoesArray.map((_, index) => (
              <FormField
                key={index}
                control={form.control}
                name='shoes'
                render={({ field }) => (
                  <FormItem className='w-full relative'>
                    <FormLabel className='absolute -top-2.5 left-[5%] opacity-90 text-sm text-[#441D81]'>
                      Shoe size / person {index + 1}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='number'
                        className='border-[1px] border-t-transparent'
                        min={21}
                        value={shoesArray[index]}
                        onChange={(e) =>
                          handleShoesChange(index, e.target.value)
                        }
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
            disabled={isLoading}
            className='bg-[#EC315A] text-white font-bold text-2xl uppercase p-2 w-full rounded-sm mt-auto'
            type='submit'
          >
            {isLoading ? 'Loading...' : 'strIIIIIike!'}
          </button>
        </form>
      </Form>
    </section>
  );
}
