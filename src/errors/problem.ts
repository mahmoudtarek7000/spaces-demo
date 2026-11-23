// Fictional demo code for a GitHub Copilot Spaces session.

export class ProblemError extends Error {
  constructor(
    public status: number,
    public orbitCode: string,
    public title: string,
    public detail?: string,
  ) {
    super(title);
  }

  toJSON(traceId: string) {
    return {
      type: `https://errors.orbit.example/orders/${this.orbitCode.toLowerCase()}`,
      title: this.title,
      status: this.status,
      detail: this.detail,
      orbitCode: this.orbitCode,
      traceId,
    };
  }
}

export const problem = (status: number, orbitCode: string, title: string, detail?: string) =>
  new ProblemError(status, orbitCode, title, detail);

export const maskMsisdn = (msisdn: string) =>
  msisdn.length < 6 ? '***' : `${msisdn.slice(0, 3)}******${msisdn.slice(-3)}`;
