import User from "../models/User";



export default {
    async getUserInfo(token: string): Promise<boolean> {
        const isValid=true;
        if (isValid) return true;
        return false;
    },
    async verifyLogin(email:string){

    },

};
