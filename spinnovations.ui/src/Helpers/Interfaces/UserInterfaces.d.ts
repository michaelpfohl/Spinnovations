declare module 'UserTypes' {
  interface User {
      id: number;
      first_Name: string;
      last_Name: string;
      address: string;
      city: string;
      country: string;
      postal_code: string;
      payment_Info_Id: number;
      display_Name: string;
      profile_Picture: string;
      user_Created_Date: Date;
      state: string;
      firebase_Uid: string;
    }
}

export { User }
