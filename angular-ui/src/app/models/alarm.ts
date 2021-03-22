import { Day } from "./day";

export interface Alarm {
  id: number;
  days: Day[];
  hour: number;
  minute: number;
  active: boolean;
}
