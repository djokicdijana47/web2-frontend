export class AccountModel{
    name: string;
    lastname: string;
    address: string;
    email : string;
    dateOfBirth : Date;
    username : string;
    accountStatus: number = 0;
    accountStatusString: string = "";
    accountImage:string;
    constructor(name:string, lastname:string, address:string, email:string, dateOfBirth:Date, username:string, accountStatus:number, imageUrl:string){
        this.name = name;
        this.lastname = lastname;
        this.address = address;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.username = username;
        this.accountStatus = accountStatus;
        this.accountImage = imageUrl;
        if(this.accountStatus == 0){
            this.accountStatusString = "New";
        }
        else if(this.accountStatus == 1){
            this.accountStatusString = "Verified";
        }
        else if(this.accountStatus == 2){
            this.accountStatusString = "Blocked";
        }
    }

    
}