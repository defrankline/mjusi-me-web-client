export interface ReportDto {
  male: number;
  female: number;
}

export interface ReportWrapper {
  student: ReportDto;
  attendee: ReportDto;
}
