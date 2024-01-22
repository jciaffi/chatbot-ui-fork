// import { CHAT_SETTING_LIMITS } from "@/lib/chat-setting-limits"
// import { LLMID } from "@/types"
// import { checkApiKey, getServerProfile } from "@/lib/server/server-chat-helpers"
// import { ChatSettings } from "@/types"
// import { OpenAIStream, StreamingTextResponse } from "ai"
// import { ServerRuntime } from "next"
// import OpenAI from "openai"
// import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.mjs"

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

//     // Etape 1 : Récupère le prompt auprès de Django

//     const previousTextMessages = messages
//       .filter(m => m.role === "user" || m.role === "assistant")
//       .map(m => m.content)
//       .slice(0, -1)

//     const payload = {
//       env: "prod", // pour choisir l'environnement test ou prod du client
//       conversation_key: currentChatId,
//       email: profile.username,
//       // code_marketing:  '',
//       previous_messages: previousTextMessages,
//       question: messages.slice(-1)[0].content,
//       request_type: "question",
//       // extraction_prompt_id: '', // ne sert qu'en mode admin pour forcer l'usage d'un certain extract prompt
//       // admin: '1', // en cas d'absence de ce paramètre, le mode admin est désactivé
//       only_prepare_prompt: "yes"
//     }
//     const clientID = process.env.COMLIS_PHARMNATURE_CLIENT_ID // Ce param est passé dans l'URL car c'est ce qui est attendu par notre Django
//     const url = `${process.env.COMLIS_DJANGO_URL}/${clientID}/gpt/`

//     const promptData: any = await fetch(url, {
//       cache: "no-store",
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload) // body data type must match "Content-Type" header
//     })
//       .then(res => {
//         console.log(`Response status: ${res.status}`) // Log the status code
//         console.log("Response headers:", res.headers) // Log the headers
//         if (res.ok) {
//           // Check if the response status is 2xx
//           return res.json()
//         } else {
//           throw new Error(
//             `Le serveur backend a répondu avec le status: ${res.status}`
//           )
//         }
//       })
//       .catch(error => {
//         console.error("Erreur de récupération des données :", error)
//       })

//     let modifiedMessages = [...messages]
//     modifiedMessages[-1] = promptData.lastMessage

//     console.log("promptData :\n--------------------------")
//     console.log(promptData)

//     // Etape 2 : envoi du prompt à GPT

//     const openai = new OpenAI({
//       apiKey: process.env.COMLIS_OPEN_API_KEY || ""
//       // organization: profile.openai_organization_id
//     })

//     const response = await openai.chat.completions.create({
//       model: promptData.model as ChatCompletionCreateParamsBase["model"],
//       messages: modifiedMessages as ChatCompletionCreateParamsBase["messages"],
//       temperature: promptData.temperature,
//       max_tokens:
//         CHAT_SETTING_LIMITS[promptData.model as LLMID].MAX_TOKEN_OUTPUT_LENGTH,
//       stream: true
//     })

//     const stream = OpenAIStream(response)

//     return new StreamingTextResponse(stream)
//   } catch (error: any) {
//     const errorMessage = error.error?.message || "An unexpected error occurred"
//     const errorCode = error.status || 500
//     console.log(error)
//     return new Response(JSON.stringify({ message: errorMessage }), {
//       status: errorCode
//     })
//   }
// }
