declare namespace Token {
  interface Data {
    user_id: string;
    value: string;
    type: string;
  }

  interface Response {
    id?: string;
    user_id: string;
    value: string;
    status: boolean;
    type: string;
    createdAt: string;
    updatedAt: string;
  }
}
