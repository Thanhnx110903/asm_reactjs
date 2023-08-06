import { useGetProductsQuery } from "@/api/product";
import { Button, Skeleton, Table, Popconfirm } from "antd";
import { IProduct } from "@/interfaces/product";
import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Home = () => {
    const { data, error, isLoading } = useGetProductsQuery();
    if (isLoading) return <Skeleton />;
    console.log("data", data);
    return (
        <div>
            <section className=" pt-20 pb-10 lg:pt-[60px] lg:pb-20">
                <div className="container mx-auto">
                    <div className="-mx-4 flex flex-wrap">
                        {data?.map((products: any) => {
                            return (
                                <div className="w-full px-4 md:w-1/3 xl:w-1/3" key={products.id}>
                                    <div
                                        className="mb-10 overflow-hidden bg-white"
                                        style={{ border: "1px solid #ccc" }}
                                    >
                                        <img
                                            src={products.img}
                                            style={{
                                                height: "300px",
                                                padding: "60px 60px 0 60px",
                                                objectFit: "contain",
                                            }}
                                            alt="image"
                                            className="w-full"
                                        />
                                        <div className="" style={{ padding: "14px" }}>
                                            <p className="price_home">${products.price}</p>
                                            <a href="javascript:void(0)" className="price_name">
                                                <Link to={`/product/${products.id}`}>{products.name}</Link>
                                            </a>
                                            <p className="description">{products.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
