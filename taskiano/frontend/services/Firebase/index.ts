import { app } from "./initService";
import "firebase/auth";


const firebaseService = {
  auth: app.auth(),
  firebase: app,
};


export default firebaseService;
