export class LangflowClient {
  private baseURL: string;
  private applicationToken: string;

  constructor(baseURL: string, applicationToken: string) {
    this.baseURL = baseURL;
    this.applicationToken = applicationToken;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async post(endpoint: string, body: any) {
    try {
      const response = await fetch("/api/langflow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flowId: "b6e2d730-5bd6-4a31-9e47-64b6ae4319cb",
          langflowId: "75d41264-dbce-4c5c-9d33-3deb76cacfe9",
          ...body,
        }),
      });

      const responseMessage = await response.json();
      if (!response.ok) {
        throw new Error(
          `${response.status} ${response.statusText} - ${JSON.stringify(
            responseMessage
          )}`
        );
      }
      return responseMessage;
    } catch (error) {
      console.error("Request Error:", error);
      throw error;
    }
  }

  async initiateSession(
    flowId: string,
    langflowId: string,
    inputValue: string,
    inputType = "chat",
    outputType = "chat",
    stream = false,
    tweaks = {}
  ) {
    return this.post("", {
      inputValue,
      inputType,
      outputType,
      stream,
      tweaks,
    });
  }

  handleStream(
    streamUrl: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onUpdate: (data: any) => void,
    onClose: (message: string) => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => void
  ) {
    const eventSource = new EventSource(streamUrl);

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onUpdate(data);
    };

    eventSource.onerror = (event) => {
      console.error("Stream Error:", event);
      onError(event);
      eventSource.close();
    };

    eventSource.addEventListener("close", () => {
      onClose("Stream closed");
      eventSource.close();
    });

    return eventSource;
  }

  async runFlow(
    flowIdOrName: string,
    langflowId: string,
    inputValue: string,
    inputType = "chat",
    outputType = "chat",
    tweaks = {},
    stream = false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onUpdate: (data: any) => void,
    onClose: (message: string) => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => void
  ) {
    try {
      const initResponse = await this.initiateSession(
        flowIdOrName,
        langflowId,
        inputValue,
        inputType,
        outputType,
        stream,
        tweaks
      );
      console.log("Init Response:", initResponse);
      if (
        stream &&
        initResponse &&
        initResponse.outputs &&
        initResponse.outputs[0].outputs[0].artifacts.stream_url
      ) {
        const streamUrl =
          initResponse.outputs[0].outputs[0].artifacts.stream_url;
        console.log(`Streaming from: ${streamUrl}`);
        this.handleStream(streamUrl, onUpdate, onClose, onError);
      }
      return initResponse;
    } catch (error) {
      console.error("Error running flow:", error);
      onError("Error initiating session");
    }
  }
}

export async function runLangflow(inputValue: string) {
  const langflowClient = new LangflowClient("", ""); // We don't need these anymore as we're using the proxy

  try {
    const response = await langflowClient.runFlow(
      "b6e2d730-5bd6-4a31-9e47-64b6ae4319cb",
      "75d41264-dbce-4c5c-9d33-3deb76cacfe9",
      inputValue,
      "chat",
      "chat",
      defaulttweaks,
      false,
      (data) => console.log("Received:", data.chunk),
      (message) => console.log("Stream Closed:", message),
      (error) => console.log("Stream Error:", error)
    );

    if (response && response.outputs) {
      const flowOutputs = response.outputs[0];
      const firstComponentOutputs = flowOutputs.outputs[0];
      const output = firstComponentOutputs.outputs.message;
      const sessionid = response.session_id;

      localStorage.setItem("sessionId", sessionid);

      return output.message.text;
    }
    return "Sorry, I couldn't process your request.";
  } catch (error) {
    console.error("Error in runLangflow:", error);
    throw error;
  }
}

const defaulttweaks = {
  //   "ChatInput-BXEwu": {
  //     session_id: localStorage.getItem("sessionId") ?? "",
  //   },
  //   "ChatOutput-UJiMV": {
  //     session_id: localStorage.getItem("sessionId") ?? "",
  //   },
};
