import { Orders } from "./Orders";

export interface Item {
  id: number,
  name: string,
  description:string,
  quantity: string,
  price: string,
  actual_price:string,
  img: string,
  orders: Orders[]
}
