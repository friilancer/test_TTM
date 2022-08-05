export const isEmail = (text:string) : boolean => !(
  /[a-z0-9-.]+@+[a-z0-9-.]+\.+[a-z]{2,}/i.test(text) === false || /[^a-z0-9._@-]/i.test(text) === true
);
export const isAlphaNumeric = (text:string) : boolean => (/[a-z]+/ig.test(text) && /\d+/g.test(text))

export const hasSpecialChar = (text: string) : boolean => (/\W+|_/g.test(text))

export const isString = (text:string) : boolean => typeof text === 'string' && text.length > 0

export const addMinutes = (date: Date, minutes:number):Date => {
    return new Date(date.getTime() + minutes*60000);
}