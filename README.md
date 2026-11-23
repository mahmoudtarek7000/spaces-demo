# orbit-orders-demo

Fictional demo repo for a GitHub Copilot Spaces session. "Orbit Telecom" and everything in here is made up.

A tiny slice of the `orders-api` service: one controller, one service and the team's endpoint template.

```
src/orders/OrderController.ts   # HTTP layer (Fastify-style)
src/orders/OrderService.ts      # order state rules
src/errors/problem.ts           # problem+json helper with orbitCode
docs/api-endpoint-template.md   # how every new endpoint must look
```
