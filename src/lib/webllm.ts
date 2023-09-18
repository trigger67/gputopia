'use client'

import * as webllm from "@mlc-ai/web-llm"

// We use label to intentionally keep it simple
function setLabel(id: string, text: string) {
  const label = document.getElementById(id);
  if (label == null) {
    throw Error("Cannot find label " + id);
  }
  label.innerText = text;
}

let chat: webllm.ChatModule;

export async function initModel() {
  chat = new webllm.ChatModule();
  chat.setInitProgressCallback((report: webllm.InitProgressReport) => {
    try {
      setLabel("perc", (report.progress * 100).toFixed(0) + "%");
    } catch (e) { }
  });
  await chat.reload("vicuna-v1-7b-q4f32_0");
  const event = new Event('model-loaded');
  document.dispatchEvent(event);
}

export async function generate(prompt: string) {
  if (!chat) {
    return
  }
  let reply
  try {
    reply = await chat.generate(prompt, () => { });
  } catch (e) {
    return
  }

  // Fetch POST to complete the inference
  console.log("Fetching POST to complete inference...", reply);

  return reply;
}
