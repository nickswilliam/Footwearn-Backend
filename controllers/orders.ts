import { Request, Response } from "express";
import Order, { IOrder } from "../models/orders";
import { ObjectId } from "mongoose";
import randomstring from 'randomstring'

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  const userID: ObjectId = req.body.userConfirmed._id;

  const consult = { user: userID };

  const orders = await Order.find(consult);

  res.json({
    data: [...orders],
  });
};

export const createOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userID: ObjectId = req.body.userConfirmed._id;

  const orderData: IOrder = req.body;

  const orderId = randomstring.generate(6).toUpperCase()

  const data = {
    ...orderData,
    user: userID,
    orderID: orderId,
    date: Date.now(),
    status: "Pending",
  };

  const order = new Order(data);

  await order.save();

  res.status(201).json({
    order,
  });
};
