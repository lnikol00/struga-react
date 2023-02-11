import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from 'react-use-cart';
import * as AiIcons from "react-icons/ai"

import styles from "./fanshop.module.css"
import FormInput from './FormInput';
import { inputs } from './Inputs';

function Cart() {
    const form = useRef()
    const [disable, setDisable] = useState(true)
    const [showCheckout, setShowCheckout] = useState(false)
    const [blured, setBluder] = useState(true)

    const [values, setValues] = useState({
        name: "",
        lastName: "",
        address: "",
        cardNumber: "",
        ccvNumber: "",
        dateNumber: ""
    })
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    console.log(values)

    const openCheckout = () => {
        setShowCheckout(!showCheckout)
        setBluder(!blured)
    }

    const closeCheckout = () => {
        setShowCheckout(!showCheckout)
        setBluder(!blured)
        form.current.reset();
    }

    const {
        isEmpty,
        totalItems,
        items,
        cartTotal,
        updateItemQuantity,
        removeItem,
    } = useCart();



    if (isEmpty) return (
        <div className={styles.cartContainer}>
            <h3>Vaša košarica ({totalItems})</h3>
            <div className={styles.topButtons}>
                <Link to="/fan-shop">
                    <button className={styles.continueButton} >Nastavi sa kupovinom</button>
                </Link>
                <button className={styles.doneButton} disabled={disable}>Nastavi sa plaćanjem</button>
            </div>
            <div className={styles.items}>
                <p>Vaša košarica je prazna</p>
            </div>
            <div className={styles.totalPrice}>
                <span>Ukupna cijena: € {cartTotal}</span>
            </div>

        </div>

    )

    return (
        <div className={styles.mainContainer}>
            <div className={showCheckout ? `${styles.checkoutContainer}` : `${styles.checkoutContainerClosed}`}>
                <AiIcons.AiOutlineCloseCircle onClick={closeCheckout} />
                <div className={styles.formInput}>
                    <form onSubmit={handleSubmit} ref={form}>
                        {inputs.map((input) => (
                            <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
                        ))}
                        <button>Završi kupnju</button>
                    </form>
                </div>
            </div>
            <div className={blured ? `${styles.cartContainer}` : `${styles.cartContainerOpen}`}>
                <h3>Vaša košarica ({totalItems})</h3>
                <div className={styles.topButtons}>
                    <Link to="/fan-shop">
                        <button className={styles.continueButton} >Nastavi sa kupovinom</button>
                    </Link>
                    <button className={styles.doneButton} onClick={openCheckout}>Nastavi sa plaćanjem</button>
                </div>
                <div className={styles.items}>
                    {items.map((item) => {
                        const addButton = () => {
                            updateItemQuantity(item.id, item.quantity + 1)
                        }

                        const subrtractButton = () => {
                            updateItemQuantity(item.id, item.quantity === 1 ? item.quantity : item.quantity - 1)
                        }

                        return (
                            <div key={item.id} className={styles.in}>
                                <div className={styles.product}>
                                    <img src={item.img} alt='slika' />
                                    <div className={styles.details}>
                                        <h5><b>Proizvod: </b>{item.title}</h5>
                                        <span><b>ID: </b>{item.nmb}</span>
                                    </div>
                                </div>
                                <div className={styles.price}>
                                    <div className={styles.amount}>
                                        <button

                                            onClick={subrtractButton}
                                            className={styles.subrtractButton}
                                        >
                                            -
                                        </button>
                                        <span >{item.quantity}</span>
                                        <button
                                            onClick={addButton}
                                            className={styles.addButton}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span><b>Cijena: </b>{item.price}</span>
                                </div>

                                <div className={styles.desc}>
                                    <h5>Opis: </h5>
                                    <p>{item.desc}</p>
                                </div>
                                <div>
                                    <AiIcons.AiOutlineClose className={styles.removeButton} onClick={() => removeItem(item.id)} />

                                </div>

                            </div>
                        )
                    })}

                </div>
                <div className={styles.totalPrice}>
                    <span>Ukupna cijena: € {cartTotal}</span>
                </div>

            </div>
        </div >
    )
}

export default Cart
