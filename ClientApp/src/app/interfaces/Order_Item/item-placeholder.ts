import { Orders } from "./Orders";

export interface Item {
  id: number,
  name: string,
  description:string,
  quantity: string,
  price: number,
  actual_price: number,
  img: string,
  order_placed: number,
  cost_Item: number,
  revenue_generated:number,
  orders: Orders[]
}
