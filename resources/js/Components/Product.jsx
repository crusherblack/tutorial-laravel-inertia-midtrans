import { toRupiah } from "@/utils";
import React from "react";

const Product = ({
    id = 0,
    name = "",
    description = "",
    image = "",
    price = "",
    onClick = () => {},
}) => {
    return (
        <div
            className="border border-gray-200 rounded-md hover:cursor-pointer hover:opacity-80"
            onClick={() =>
                onClick({
                    id,
                    name,
                    description,
                    image,
                    price,
                })
            }
        >
            <img src={image} className="object-cover aspect-video" />
            <div className="p-4">
                <p className="font-semibold text-xl">{name}</p>
                <p>{description}</p>
                <p>{toRupiah(price)}</p>
            </div>
        </div>
    );
};

export default Product;
