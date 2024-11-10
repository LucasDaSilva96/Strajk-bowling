export interface BookingRequest {
  when: string;
  lanes: number;
  people: number;
  shoes: number[];
}

export interface BookingResponse extends BookingRequest {
  id: string;
  price: number;
  active: boolean;
}
