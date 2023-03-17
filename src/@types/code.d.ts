declare namespace Code {
    interface Data {
        userId: string
        code: string
        type: string
    }

    interface Response {
        id?: string 
        user_id: string 
        code: string 
        status: boolean
        createdAt: string
        updatedAt: string 
    }
}