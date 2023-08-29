import React from "react";
import ApplicationLogo from "./ApplicationLogo";
import { Link } from "@inertiajs/react";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const PublicNavbar = ({ auth }) => {
    return (
        <nav className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                            </Link>
                        </div>
                    </div>

                    {auth?.user ? (
                        <div className="flex items-center gap-2">
                            <p>{auth?.user?.name}</p>
                            <Link href="/dashboard">
                                <SecondaryButton type="button">
                                    Dashbord
                                </SecondaryButton>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/login">
                                <PrimaryButton type="button">
                                    Login
                                </PrimaryButton>
                            </Link>
                            <Link href="/register">
                                <SecondaryButton type="button">
                                    Register
                                </SecondaryButton>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default PublicNavbar;
