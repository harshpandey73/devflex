import { Client, Account, ID} from 'appwrite';
import config from '../config/config';

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId);
        
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                // call login method
                return this.login(email, password);
            } else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
    
    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return this.account.get();
        } catch (error) {
            console.log("User Session error :: getCurrentUser", error);
        }
        return null;
    }

    async logout(){
        try {
            return this.account.deleteSessions();
        } catch (error) {
            console.log("Logout error :: logout", error);
        }
    }
    
}

const authService = new AuthService();

export default authService;