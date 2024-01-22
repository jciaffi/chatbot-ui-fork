// import { CHAT_SETTING_LIMITS } from "@/lib/chat-setting-limits"
// import { LLMID } from "@/types"
// import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
// import { ChatSettings } from "@/types"
// import { OpenAIStream, StreamingTextResponse } from "ai"
// import { ServerRuntime } from "next"
// import OpenAI from "openai"
// import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.mjs"
// import EventSource from "eventsource"

// // should be declared (!)
// export const dynamic = "force-dynamic"

// export const runtime: ServerRuntime = "edge"

// export async function POST(request: Request) {
//   const json = await request.json()
//   const { chatSettings, messages, currentChatId } = json as {
//     chatSettings: ChatSettings
//     messages: any[]
//     currentChatId: string // Django a besoin de la conversation_key
//   }

//   try {
//     const profile = await getServerProfile()

//     const payload = {
//       env: "prod",
//       conversation_key: currentChatId,
//       email: profile.username,
//       question: messages.slice(-1)[0].content,
//       request_type: "question"
//       // other payload properties
//     }

//     const clientID = process.env.COMLIS_PHARMNATURE_CLIENT_ID
//     let url = `${process.env.COMLIS_DJANGO_URL}/${clientID}/gpt/?`

//     // Build query string from payload. POST is not possible with SSE.
//     Object.entries(payload).forEach(([key, val], index) => {
//       if (val !== undefined && val !== null) {
//         url += `${index > 0 ? "&" : ""}${encodeURIComponent(
//           key
//         )}=${encodeURIComponent(val)}`
//       }
//     })

//     let responseStream = new TransformStream()
//     const writer = responseStream.writable.getWriter()
//     const encoder = new TextEncoder()

//     const resp = new EventSource(url)
//     resp.onmessage = async e => {
//       await writer.write(encoder.encode(`event: message\ndata: ${e.data}\n\n`))
//     }

//     resp.onerror = async () => {
//       resp.close()
//       await writer.close()
//     }

//     return new Response(responseStream.readable, {
//       headers: {
//         "Content-Type": "text/event-stream",
//         "Cache-Control": "no-cache, no-transform"
//       }
//     })

//     const evtSource = await new EventSource(url)

//     // console.log(`Response status: ${response.status}`);
//     // console.log('Response headers:', response.headers);

//     if (!evtSource.ok) {
//       // pas testé
//       throw new Error(
//         `Le serveur backend a répondu avec le status: ${response.status}`
//       )
//     }

//     // listen to "admin" events

//     let admin_info = ""
//     evtSource.addEventListener("admin", event => {
//       admin_info += event.data
//     })

//     // // update "next_extraction_prompt_id" events

//     // evtSource.addEventListener("next_extraction_prompt_id", (event) => {
//     //   document.getElementById('extraction_prompt_id').value= event.data;
//     // });

//     // listen to "data" events

//     evtSource.onmessage = function (event) {
//       controller.enqueue(new TextEncoder().encode(event.data))
//     }

//     // listen to "erreur" events (fonctionnement pour informer admin sur les erreurs connues)

//     let erreur_info = ""
//     evtSource.addEventListener("erreur", event => {
//       erreur_info += event.data
//       // answer_there_was_an_error() << inutile car les erreurs sont affichées pour les user aussi, plus bas
//     })

//     // erreurs non maîtrisées

//     evtSource.onerror = function (event) {
//       // answer_there_was_an_error()
//     }

//     // listen to "warning" events

//     let warning_info = ""
//     evtSource.addEventListener("warning", event => {
//       warning_info += event.data
//     })

//     // listen to "stop" events

//     evtSource.addEventListener("stop", event => {
//       evtSource.close()
//       controller.close()
//     })

//     return new Response(modifiedStream)
//   } catch (error: any) {
//     const errorMessage = error.error?.message || "An unexpected error occurred"
//     const errorCode = error.status || 500
//     console.log(error)
//     return new Response(JSON.stringify({ message: errorMessage }), {
//       status: errorCode
//     })
//   }
// }
