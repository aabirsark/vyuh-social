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
          Authorization: `Bearer AstraCS:lOCIAgzeeQipGTiWZplaBngm:04313c9e87abffbb0bb04e5a1cfaef5cab066e91f41d881c03209ff1f98737a2`,
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
