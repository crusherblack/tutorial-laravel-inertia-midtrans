import { useState } from "react";

import { Head, usePage } from "@inertiajs/react";
import { toast } from "react-toastify";
import axios from "axios";

import Container from "@/Components/Container";
import PrimaryButton from "@/Components/PrimaryButton";
import Product from "@/Components/Product";
import { toRupiah } from "@/utils";
import PublicNavbar from "@/Components/PublicNavbar";
import SecondaryButton from "@/Components/SecondaryButton";

const localStorageProducts = window.localStorage.getItem("cart");
const parseProducts = localStorageProducts
    ? JSON.parse(localStorageProducts)
    : [];

export default function Welcome({ auth }) {
    const { products } = usePage().props;
    const [checkoutProducts, setCheckoutProducts] = useState(parseProducts);

    const onProductClick = (product) => {
        const findProductByIndex = checkoutProducts.findIndex(
            (checkoutProduct) => checkoutProduct.id === product.id
        );

        if (findProductByIndex > -1) {
            const copiedCheckoutProducts = [...checkoutProducts];

            const product = copiedCheckoutProducts[findProductByIndex];

            copiedCheckoutProducts[findProductByIndex] = {
                ...product,
                qty: product.qty + 1,
            };

            setCheckoutProducts(copiedCheckoutProducts);

            window.localStorage.setItem(
                "cart",
                JSON.stringify(copiedCheckoutProducts)
            );
        } else {
            setCheckoutProducts((prev) => [
                ...prev,
                {
                    ...product,
                    qty: 1,
                },
            ]);
        }
    };

    const totalCheckoutProducts = (checkoutProducts) => {
        return checkoutProducts.reduce(
            (prev, curr) => prev + curr.qty * curr.price,
            0
        );
    };

    const checkoutOrder = async () => {
        try {
            const total = totalCheckoutProducts(checkoutProducts);

            if (total === 0) return;

            const response = await axios.post("/midtrans/checkout", {
                total: totalCheckoutProducts(checkoutProducts),
            });

            snap.pay(response.data, {
                onSuccess: function (result) {
                    toast("Payment Berhasil");
                    setCheckoutProducts([]);
                },

                onPending: function (result) {
                    toast("Payment Pending");
                    setCheckoutProducts([]);
                },

                onError: function (result) {
                    toast("Payment Error");
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const clearChart = () => {
        setCheckoutProducts([]);
    };

    return (
        <>
            <PublicNavbar auth={auth} />
            <Head title="Welcome" />

            <Container>
                <div className="flex gap-6">
                    <div className="w-2/3">
                        <h1 className="font-bold mb-4 text-xl">Product List</h1>
                        <div className="grid grid-cols-3 gap-6">
                            {products.map((product) => (
                                <Product
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    description={product.description}
                                    image={product.image}
                                    price={product.price}
                                    onClick={onProductClick}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="w-1/3">
                        <h1 className="font-bold mb-4 text-xl">Checkout</h1>
                        <div>
                            {checkoutProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center justify-between"
                                >
                                    <p>
                                        {product.name} {`x ${product.qty}`}
                                    </p>
                                    <p>{toRupiah(product.price)}</p>
                                </div>
                            ))}
                            <span className="flex items-center justify-between mt-6 mb-2 font-bold text-xl">
                                <h2>Total:</h2>
                                <p>
                                    {" "}
                                    {toRupiah(
                                        totalCheckoutProducts(checkoutProducts)
                                    )}
                                </p>
                            </span>
                            <div className="flex items-center gap-2">
                                <SecondaryButton
                                    onClick={clearChart}
                                    disabled={checkoutProducts.length < 1}
                                >
                                    Clear Chart
                                </SecondaryButton>
                                <PrimaryButton onClick={checkoutOrder}>
                                    Checkout
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
