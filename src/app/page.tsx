import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Navbar from "./components/Navbar";

export default async function Home() {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    return (
        <>
            <Navbar />
            <div className="p-5">
                <h1 className="text-3xl">
                    Hello, {user?.name}. Your email is {user?.email}
                </h1>
            </div>
        </>
    );
}
