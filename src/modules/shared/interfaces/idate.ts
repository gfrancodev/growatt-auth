export interface IDate {
  isExpired(date: string, expired: string): boolean;
  set2hours(date: string): string;
}
