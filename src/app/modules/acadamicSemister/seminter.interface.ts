export type TMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export interface IAcademicSemister {
  name: 'Autumn' | 'Summer' | 'Fall';
  code: '01' | '02' | '03' | '04';
  year: number;
  startMonth: TMonth;   // ✅ spelling fixed
  endMonth: TMonth;
}
