
interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
}

export function jsonResponse<T>(data: ApiResponse<T>, status: number = 200): Response {
    return new Response(JSON.stringify(data), { status });
}

export function errorResponse(message: string, status: number = 400): Response {
    return jsonResponse({ success: false, message }, status);
}
