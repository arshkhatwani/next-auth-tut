"use client";

import React from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function page() {
    const { data } = useSession();
    if (data?.user) {
        redirect("/");
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center ">
            <h1 className="text-3xl mb-5 font-light">Custom Login Page</h1>
            <button
                className="px-5 py-3 bg-blue-500 text-white text-xl rounded-lg hover:bg-blue-600"
                onClick={() => {
                    signIn("google", { redirect: true });
                }}>
                Login with Google
            </button>
        </div>
    );
}
