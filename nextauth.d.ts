import {defaultSession, DefaultUser} from '@next-auth'

declare module "next-auth"{
    interface Session extends DefaultSession{
    user : defaultUser & {
        id : string
    }   
  }
}