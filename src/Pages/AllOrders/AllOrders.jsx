
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../Context/User.context';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';

export default function AllOrders() {
    const [orders, setOrders] = useState(null);
    const { token } = useContext(userContext);
    const { id } = jwtDecode(token);

    async function getUserOrders() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
                method: "GET",
                headers: {
                     token
                },
            };

            const { data } = await axios.request(options);
            setOrders(data);
            console.log(data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUserOrders();
    }, []);

    return (
        <>
            {!orders ? (
                <Loading />
            ) : (
                orders.map((order) => (
                    <div
                        key={order._id}
                        className="order border border-gray-400 rounded p-4 my-3"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-gray-500">Order ID</h2>
                                <h3>#{order.id}</h3>
                            </div>
                            <div>
                                {order.isDelivered ? (
                                    <span className="btn-primary font-cairo inline-block bg-lime-500 me-2">
                                        تم التوصيل
                                    </span>
                                ) : (
                                    <span className="btn-primary font-cairo inline-block bg-blue-500 me-2">
                                        قيد التوصيل
                                    </span>
                                )}
                                {order.isPaid ? (
                                    <span className="btn-primary font-cairo inline-block bg-yellow-600">
                                        تم الدفع
                                    </span>
                                ) : (
                                    <span className="btn-primary font-cairo inline-block bg-red-600">
                                        غير مدفوع
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-12 gap-3">
                            {order.cartItems.map((item) => (
                                <div
                                    key={item._id}
                                    className="product col-span-2 shadow border p-2 my-3 rounded col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2"
                                >
                                    <img
                                        src={item.product.imageCover}
                                        alt=""
                                        className="w-full h-40 object-contain"
                                    />
                                    <h3 className="font-semibold py-2">
                                        {item.product.title}
                                    </h3>
                                    <span>{item.price} L.E</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </>
    );
}