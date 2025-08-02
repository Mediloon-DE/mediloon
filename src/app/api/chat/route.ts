import { type NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {

        const clientRequestBody = await req.json();


        const backendUrl = `${process.env.EXPRESS_SERVER_URL}/api/chat/streaming`;


        const backendResponse = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

                'x-api-key': process.env.EXPRESS_BACKEND_API_KEY!,
            },

            body: JSON.stringify(clientRequestBody),
        });


        if (!backendResponse.ok) {

            const errorData = await backendResponse.json();
            console.error("Error from Express backend:", errorData);
            return NextResponse.json(
                { error: errorData.error || "An error occurred" },
                { status: backendResponse.status }
            );
        }


        if (backendResponse.body) {
            const stream = new ReadableStream({
                async start(controller) {
                    const reader = backendResponse.body!.getReader();
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) {
                            break;
                        }
                        controller.enqueue(value);
                    }
                    controller.close();
                },
            });


            return new Response(stream, {
                headers: { 'Content-Type': 'text/plain; charset=utf-8' },
            });
        } else {

            return NextResponse.json({ message: "No content from backend." });
        }

    } catch (error) {
        console.error("Error in Next.js proxy route:", error);
        return NextResponse.json(
            { error: "An internal server error occurred in the proxy." },
            { status: 500 }
        );
    }
}