export class UserModel{
    name: string;
    lastname: string;
    address: string;
    accountType: number;
    password : string;
    repeatedPassword: string;
    email : string;
    dateOfBirth : Date;
    username : string;
    constructor(name:string, lastname:string, address:string, accountType:number, password:string, repeatPassword:string, email:string, dateOfBirth:Date, username:string){
        this.name = name;
        this.lastname = lastname;
        this.address = address;
        this.accountType = accountType;
        this.password = password;
        this.repeatedPassword = repeatPassword;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.username = username;
    }
}