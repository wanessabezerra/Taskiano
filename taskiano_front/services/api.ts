import axios from "axios";
import User from "../@types/User";

const baseUrl = "https://api.github.com/users/";

type GitHubUser = {
    id: string;
    name: string;
    avatar_url: string;
};
export async function getUser(username: string): Promise<User> {
    const user: GitHubUser = (await axios.get(baseUrl + username)).data;

    return {
        id: user.id,
        name: user.name,
        avatar: user.avatar_url,
    };
}
