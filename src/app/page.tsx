import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    return (
        <div className="p-5">
            <h1 className="text-3xl">Hello, {user?.name}</h1>
        </div>
    );
}
