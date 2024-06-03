import { Role } from "@prisma/client";

interface UserDTO{
    Id : string
    Username : string;
    Email : string;
    Displayname : string;
    CreatedAt : Date
    UpdatedAt : Date
    Status : string
    Role : Role

}

export { UserDTO }