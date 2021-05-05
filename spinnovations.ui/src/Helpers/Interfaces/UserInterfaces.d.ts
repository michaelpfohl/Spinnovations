declare module 'UserTypes' {
  interface User {
      id: number | null;
      first_Name: string | null;
      last_Name: string | null;
      address: string | null;
      city: string | null;
      country: string | null;
      postal_code: string | null;
      display_Name: string;
      image_Url: string;
      user_Created_Date: Date | null;
      state: string | null;
      firebase_Uid: string;
      email: string;
    }
}

export { User }
