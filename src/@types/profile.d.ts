declare namespace Profile {
  interface Data {
    user_id: string;
    photo?: string;
    age?: number;
    bio?: string;
    experience?: string;
    occupation?: string;
    charge?: string;
    course?: string;
    institute?: string;
    graduation?: string;
    bussiness?: string;
    linkedin?: string;
    twitter?: string;
  }

  interface Response {
    id?: string;
    userId: string;
    value: string;
    status: boolean;
    type: string;
    createdAt: string;
    updatedAt: string;
  }
}
