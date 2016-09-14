export class MediaData {
  constructor(
    public ngoCode?: string,
    public countryOfOffence?: string,
    public subjectName?: string,
    public sourceUrl?: string,
    public optSourceUrl1?: string,
    public optSourceUrl2?: string,
    public entityType?: string,
    public headline?: string,
    public additionalInformation?:string,
    public nationality?: string,
    public age?: string,
    //public age?: number,
    public gender?: string

  ) {  }
}
