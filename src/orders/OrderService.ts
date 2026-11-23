// Fictional demo code for a GitHub Copilot Spaces session.
import { problem } from '../errors/problem';

export type OrderStatus =
  | 'CREATED' | 'RESERVED' | 'PAID' | 'SHIPPED' | 'ACTIVATED' | 'CANCELLED' | 'EXPIRED';

export interface Order {
  id: string;
  status: OrderStatus;
  msisdn: string;
  amountMinor: number;
  currency: string;
}

export class OrderService {
  constructor(private repo: { get(id: string): Promise<Order | undefined>; save(o: Order): Promise<void> }) {}

  async get(orderId: string): Promise<Order> {
    const order = await this.repo.get(orderId);
    if (!order) throw problem(404, 'ORD-3001', 'Order not found', `No order ${orderId}`);
    return order;
  }

  // BUG (issue #1): no check for SHIPPED/ACTIVATED, so the repo layer throws and we return 500.
  async cancel(orderId: string): Promise<Order> {
    const order = await this.get(orderId);
    order.status = 'CANCELLED';
    await this.repo.save(order);
    return order;
  }
}
