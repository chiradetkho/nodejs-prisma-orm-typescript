import { Request, Response, NextFunction } from 'express';

export function loggerHandler(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;

    console.log(
      `${req.method} ${req.originalUrl} | Status: ${res.statusCode} | Time: ${duration}ms`
    );
  });

  next();
}
