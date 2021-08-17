import { app } from "./initService";
import "firebase/auth";

const auth = app.auth();

export { auth, app };
