import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { cartContext } from '../../Context/Cart.context'
import Loading from '../../Components/Loading/Loading';


export default function Cart() {

    const {  cartInfo, removeProduct, clearCart, updateCartItemCount, getCartInfo  } = useContext(cartContext);

    useEffect(() => {
        getCartInfo();
      }, [getCartInfo]);
    

    return (
        <>
            {cartInfo === null ? <Loading /> :
                <>
                    <section className='bg-slate-100 p-5'>
                        <h2 className='text-2x font-bold mb-2'>
                            <span className='text-black font-semibold text-xl uppercase'>Shop Cart </span>
                            <i className="fa-solid fa-cart-shopping ml-2 text-primary text-lg"></i>
                        </h2>
                        {
                            cartInfo.length == 0 ?
                                <div className='flex flex-col gap-3 justify-center items-center py-14'>
                                    <h3 className='text-lg'>there is no items yet!</h3>
                                    <NavLink to={'/'} className='btn-primary mt-2'>add your first product to cart</NavLink>
                                </div> :
                                <div className='my-3'>
                                    <h3 className='text-mainColor text-lg'>Total Cart Price: <span className='font-bold'>{cartInfo.data.totalCartPrice}</span> EGP</h3>
                                    {cartInfo.data.products.map((product) =>
                                        <div key={product._id} className="product mt-5 grid grid-cols-12 gap-5">
                                            <div className='col-span-1'>
                                                <img src={product.product.imageCover} alt="" className='w-full h-full contain' />
                                            </div>
                                            <div className='col-span-11 flex justify-between items-center'>
                                                <div>
                                                    <h4 className='font-semibold text-lg'>{product.product.title}</h4>
                                                    <h6 className='text-primary my-1'>Price : {product.price} L.E</h6>
                                                    <button onClick={() => { removeProduct(product.product._id) }} className='btn-primary bg-red-500 text-sm mt-3'><i className='fa-solid fa-trash-can mr-2 '></i> remove</button>
                                                </div>
                                                <div className='flex items-center gap-2 h-fit'>
                                                     <button onClick={() => { updateCartItemCount(product.product._id, ++product.count) }} className='btn-primary bg-mainColor text-white p-1 text-sm'><i className='fa-solid fa-plus'></i></button>
                                                    <span className='text-lg font-semibold'>{product.count}</span>
                                                    <button onClick={() => {
                                                        if (product.count > 1)
                                                            updateCartItemCount(product.product._id, --product.count)
                                                        else
                                                            removeProduct(product.product._id)
                                                    }} className='btn-primary bg-mainColor text-white p-1 text-sm'><i className='fa-solid fa-minus'></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className='flex justify-end'>
                                        <button onClick={clearCart} className='btn-primary bg-red-600 mt-3'>clear cart</button>
                                    </div>
                                </div>
                        }
                    </section>
                    {
                        cartInfo.numOfCartItems > 0 ?
                            <div className='m-4 flex justify-end'>
                                <NavLink to={'/checkout'} className='btn-primary'>Next step →</NavLink>
                            </div> : ''
                    }
                </>

            }

        </>
    )
}

