"route_witout_openai_nor_SSE.ts"
import { CHAT_SETTING_LIMITS } from "@/lib/chat-setting-limits"
import { LLMID } from "@/types"
import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
import { ChatSettings } from "@/types"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { ServerRuntime } from "next"
import OpenAI from "openai"
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.mjs"
import { clients } from "@/lib/comlis" // comlis

export const runtime: ServerRuntime = "edge"

export async function POST(request: Request) {
  const json = await request.json()
  const { chatSettings, messages, currentChatId } = json as {
    chatSettings: ChatSettings
    messages: any[]
    currentChatId: string // Django a besoin de la conversation_key
  }

  console.log("openai messages", messages, "\n\n\n")

  try {
    const profile = await getServerProfile()

    let env = chatSettings.embeddingsProvider
    if (!["test", "prod"].includes(env)) env = "prod"
    const payload = {
      env: env, // pour choisir l'environnement test ou prod du client
      conversation_key: currentChatId,
      email: profile.username,
      // code_marketing:  '',
      question: messages.slice(-1)[0].content,
      nb_messages: messages.length - 1, // utile si user a édité un message antérieur. On ne compte pas le message système
      request_type: "question"
      // extraction_prompt_id: '', // ne sert qu'en mode admin pour forcer l'usage d'un certain extract prompt
      // // admin: '1', // en cas d'absence de ce paramètre, le mode admin est désactivé
    }
    let clientID = chatSettings.temperature
    // for legacy conversations
    if (clientID === 0.5)
      clientID = process.env.NODE_ENV === "development" ? 2 : 2

    const djangoURL =
      process.env.COMLIS_DJANGO_URL || process.env.NEXT_PUBLIC_COMLIS_DJANGO_URL // usefull for dev env
    let url = `${djangoURL}/${clientID}/gpt/`

    const response = await fetch(url, {
      cache: "no-store",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })

    // console.log(`Response status: ${response.status}`)
    // console.log("Response headers:", response.headers)

    if (!response.ok) {
      throw new Error(
        `Le serveur backend a répondu avec le status: ${response.status}`
      )
    }

    // transmet la réponses telle quelle
    return new Response(response.body)

    // Create a transform stream to modify the chunks
    // cf django code pour savoir comment est codé le SSE stream : c'est moi qui l'aie codé.
    // const modifiedStream = new ReadableStream({
    //   async start(controller) {
    //     const reader = response!.body!.getReader()
    //     const decoder = new TextDecoder("utf-8")
    //     let accumulator: String = ""

    //     while (true) {
    //       let { done, value } = await reader.read()
    //       if (done) break

    //       // Convert Uint8Array to string and accumulate
    //       let chunk = decoder.decode(value, { stream: true })
    //       accumulator += chunk

    //       // Split on \n\n
    //       const lines = accumulator.split("\n\n")
    //       accumulator = lines.pop() || "" // Keep the last partial line for the next chunk

    //       // Process each message
    //       lines.forEach(line => {
    //         if (line.match(/event: stop\ndata: stop/)) {
    //           done = true
    //         }
    //         if (!done) {
    //           let match = line.match(/data: (.*)/)
    //           let extractedText = match ? match[1] : ""
    //           extractedText = atob(extractedText) // text is base 64 encoded
    //           controller.enqueue(new TextEncoder().encode(extractedText))
    //         }
    //       })
    //     }

    //     controller.close()
    //     reader.releaseLock()
    //   }
    // })
    // return new Response(modifiedStream)
  } catch (error: any) {
    const res = {
      message: "Il y a eu un problème...",
      errorMessage: error?.message,
      errorStack: error.error
    }
    console.log(error)
    return new Response(JSON.stringify(res), {
      status: error.status || 500
    })
  }
}
