import { UserModel } from "../models/user"

// returns an array if the email is valid and returns null if the email is not valid.
export const validateEmail = (email: string) => email.match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/)

// this function returns true if all the required fields are present in the data and returns false if any of the field is absent
export const validateRequiredFields = (data: Record<string, any>, requiredFields: string[]): boolean => {
    const missingFields = requiredFields.filter(field => !data[field])
    if(missingFields.length > 0) {
        console.log("[MISSING_FIELDS]",missingFields)
        return false
    }
    return true
}

export const validateLength = (data: string, min: number, max: number): boolean => {
    if(data.length > max || data.length < min) return false
    return true
}

export const validateUsername = async (username: string) : Promise<string> => {
    let flag = false 
    do {
        let checkUsername = await UserModel.findOne({username})
        if(checkUsername){
            //+new Date(): The unary plus operator (+) before new Date() converts the Date object to a numeric timestamp. It effectively extracts the Unix timestamp in milliseconds from the Date object.
            username += (+new Date() * Math.random()).toString().substring(0,1) 
            flag = true
        }
        else flag = false
    }while(flag)
    return username
}