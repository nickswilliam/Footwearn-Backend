import { Model, Schema, model, Types } from "mongoose";

export interface IShippingDetails {
    name: string,
    cellphone: number,
    location: string,
    adress: string 
}

export interface IImg {
    id: number,
    img: string
}

export interface IItem {
    id: number,
    title: string,
    imgs: IImg[],
    price: number,
    sizeSelect: number,
    brand: string,
    quantity: number,
    discount: number,
    description: string
}

export interface IOrder {
    date: Date, 
    user: Types.ObjectId, 
    price: number,
    shippingCost: number,
    orderID: string, 
    cartItems: IItem[],
    shippingDetails: IShippingDetails,
    status: string, 
    total: number
}

const OrderSchema = new Schema<IOrder>({
    date:{
        type: Date,
        default: Date.now,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    shippingCost: {
        type: Number
    },
    orderID: {
        type: String,
        required: true
    },
    cartItems: {
        type: [
            {
                id: {
                    type: Number,
                    required: true
                },
                title: {
                    type: String,
                    required: true
                },
                imgs: {
                    type: [
                        {
                            id: {
                                type: Number,
                                required: true
                            },
                            img: {
                                type: String,
                                required: true
                            }
                        }
                    ],
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                sizeSelect: {
                    type: Number,
                    required: true
                },
                brand: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
                discount: {
                    type: Number,
                    required: true
                },
                description: {
                    type: String,
                    required: true
                }
            }
        ],
        required: true
    },
    shippingDetails: {
        name:{
            type: String,
            required: true
        },
        cellphone: {
            type: Number,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        adress: {
            type: String,
            required: true
        }
    },
    status: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
})

const Order: Model<IOrder> = model<IOrder>("Order", OrderSchema)
export default Order