export class FormError {
  first_name: string;
  last_name: string;
  dob: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  constructor() {
    (this.first_name = ""),
      (this.last_name = ""),
      (this.dob = ""),
      (this.phone = ""),
      (this.email = ""),
      (this.website = ""),
      (this.address = "");
  }
}
