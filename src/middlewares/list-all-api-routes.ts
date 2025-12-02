import { Request, Response, NextFunction } from "express";

export function listRoutes(app: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        const routes: any[] = [];

        app._router.stack.forEach((middleware: any) => {
            if (middleware.route) {
                // Route directly on app
                const route = middleware.route;
                const method = Object.keys(route.methods)[0].toUpperCase();
                routes.push({ method, path: route.path });
            } else if (middleware.name === "router") {
                // Routes inside router
                middleware.handle.stack.forEach((handler: any) => {
                    const route = handler.route;
                    if (route) {
                        const method = Object.keys(route.methods)[0].toUpperCase();
                        routes.push({ method, path: route.path });
                    }
                });
            }
        });

        return res.json({
            total: routes.length,
            routes
        });
    };
}
