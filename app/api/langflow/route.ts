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
          Authorization: `Bearer AstraCS:UZZQUeYJYjFUCbWvSZIUnNGP:c3562232a1af346af32dd0702e60c884509bc208af9fcdf4812526aec4521f95`,
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
