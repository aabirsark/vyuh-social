import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    flowId,
    langflowId,
    inputValue,
    inputType,
    outputType,
    stream,
    tweaks,
  } = body;

  try {
    const response = await fetch(
      `https://api.langflow.astra.datastax.com/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer AstraCS:memXGujFPPyZSkAyRwjoWKXf:6e5ea1855fb1dbe65f11c6104b16f1bdf38d9a5ef3440b0628467e8b4b646191`,
        },
        body: JSON.stringify({
          input_value: inputValue,
          input_type: inputType,
          output_type: outputType,
          tweaks: tweaks,
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from Langflow API" },
      { status: 500 }
    );
  }
}
