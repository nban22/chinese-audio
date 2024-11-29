export const catchAsync = (fn: () => Promise<any>) => {
    return async () => {
        try {
            return await fn();
        }
        catch (error: any) {
            console.error("API error: ", error);

            throw new Response("Something went wrong with the API.", {
                status: error?.response?.status || 500,
                statusText: error?.response?.statusText || "Internal Server Error",
            });
        }
    }
}
