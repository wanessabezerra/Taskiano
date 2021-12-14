import {
  AuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";

import FireController from "./FireController";

import { HistoryController, ProjectController } from ".";
import { UserRef } from "../models";
import { UserSchema } from "../schemas";

import type { IUser, IFirebaseUser } from "../../types";

class Controller extends FireController<IUser> {
  constructor() {
    super({
      ref: UserRef,
      schema: UserSchema,
      _name: "User",
    });
  }

  public async create(data: IUser, _id: string): Promise<IUser> {
    await this.Validator(data);

    await HistoryController.init(_id);
    await ProjectController.init(_id);

    const user = await super.create(data, _id);

    return { ...user };
  }

  public assembleUser(user: IFirebaseUser) {
    return {
      id: user.uid,
      username: user.displayName,
      avatar: user.photoURL,
      email: user.email,
    };
  }

  public ErrorAccountExists(code: string) {
    return code === "auth/account-exists-with-different-credential";
  }

  public getProvider(providerId: string): AuthProvider {
    switch (providerId) {
      case GoogleAuthProvider.PROVIDER_ID:
        return new GoogleAuthProvider();
      case FacebookAuthProvider.PROVIDER_ID:
        return new FacebookAuthProvider();
      case TwitterAuthProvider.PROVIDER_ID:
        return new TwitterAuthProvider();
      case GithubAuthProvider.PROVIDER_ID:
        return new GithubAuthProvider();
      default:
        throw new Error(`No provider implemented for ${providerId}`);
    }
  }
}

const UserController = new Controller();

export default UserController;
