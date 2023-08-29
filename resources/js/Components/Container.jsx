import React from "react";
import { ToastContainer } from "react-toastify";

const Container = ({ children }) => {
    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children} </div>
            <ToastContainer />
        </div>
    );
};

export default Container;
