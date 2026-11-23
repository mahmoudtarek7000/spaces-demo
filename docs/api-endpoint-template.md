# Template: adding a new order endpoint

> Fictional demo content. Copy this shape for every new endpoint in `orders-api`.

## Checklist

- [ ] Route lives in `src/orders/OrderController.ts`
- [ ] Business rules live in `OrderService`, never in the controller
- [ ] `POST` routes call `requireIdempotencyKey(req)` first (ADR-0007)
- [ ] Known failures throw `problem(status, orbitCode, title, detail)`, never a raw `Error`
- [ ] Money in responses uses `amountMinor` + `currency`
- [ ] Logs use `maskMsisdn()` for phone numbers
- [ ] Add a test for the happy path and for each `orbitCode` you return

## Example

```ts
app.post('/orders/:orderId/refund', async (req, reply) => {
  const key = requireIdempotencyKey(req);           // 400 ORD-1001 if missing
  const { orderId } = req.params as { orderId: string };

  const result = await orderService.refund(orderId, key);

  req.log.info({ orderId, msisdn: maskMsisdn(result.msisdn) }, 'order refunded');
  return reply.code(200).send({
    orderId,
    status: result.status,
    refund: { amountMinor: result.amountMinor, currency: result.currency },
  });
});
```
