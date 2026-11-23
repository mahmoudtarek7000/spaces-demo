// Fictional demo code for a GitHub Copilot Spaces session.
import { FastifyInstance, FastifyRequest } from 'fastify';
import { problem, ProblemError } from '../errors/problem';
import { OrderService } from './OrderService';

export const requireIdempotencyKey = (req: FastifyRequest): string => {
  const key = req.headers['idempotency-key'];
  if (typeof key !== 'string' || key.length === 0) {
    throw problem(400, 'ORD-1001', 'Idempotency-Key header is required');
  }
  return key;
};

export function registerOrderRoutes(app: FastifyInstance, orderService: OrderService) {
  app.get('/orders/:orderId', async (req) => {
    const { orderId } = req.params as { orderId: string };
    const order = await orderService.get(orderId);
    return {
      orderId: order.id,
      status: order.status,
      total: { amountMinor: order.amountMinor, currency: order.currency },
    };
  });

  // TODO: POST /orders/:orderId/cancel — not implemented yet
    app.post('/orders/:orderId/cancel', async (req) => {
    requireIdempotencyKey(req);
    const { orderId } = req.params as { orderId: string };
    const order = await orderService.cancel(orderId);
    return {
      orderId: order.id,
      status: order.status,
      total: { amountMinor: order.amountMinor, currency: order.currency },
    };
  });

  app.setErrorHandler((err, req, reply) => {
    if (err instanceof ProblemError) {
      return reply.code(err.status).type('application/problem+json').send(err.toJSON(req.id));
    }
    // BUG (issue #1): logs the raw MSISDN from the request body
    req.log.error({ body: req.body }, 'unexpected error');
    return reply
      .code(500)
      .type('application/problem+json')
      .send(problem(500, 'ORD-9001', 'Unexpected error').toJSON(req.id));
  });
}
