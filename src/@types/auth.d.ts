declare namespace Auth {
    interface Credentials {
        email: string
        username: string
    }

    interface Data {
        fullname: string
        email: stirng 
        gender: string
        username: string 
        password: string 
    }

    interface Response {
        id?: string 
        email: string 
        email_verify: string
        username: string 
        role: Record<string, sting>[]
        password: string 
        passwordResetToken: string
        passwordExpires: string 
        createdAt: string  
        updatedAt: string
    }
}