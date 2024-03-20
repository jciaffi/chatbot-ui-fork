"use client"

import { useContext, createContext, useState, useEffect } from "react"
import { ChatbotUIContext } from "@/context/context"
import { clients } from '@/lib/comlis' // comlis

export const DjangoContext = createContext({})

export const DjangoState = ({ children }) => {

  const { profile:cuiProfile } = useContext(ChatbotUIContext)
  
  // djangoProfile : all clients that user can connect to

  // Content is returned by the "profile" django's endpoint. Arguments for that endpoint are user's email and prefered client.
  // email and prefered client are store in supabase, in profile "username" and "anthropic_api_key".

  const [ djangoProfile, setDjangoProfile ] = useState({}) 
    
  useEffect(() => {
    if (cuiProfile) {
      getDjangoProfile(cuiProfile)
        .then(dp=>
          setDjangoProfile(dp))
    }
  }, [cuiProfile])

  // comlisClient : client info for a particular conversation
  // 
  // Use chatSettings which is stored in supabase.
  //   - chatSettings.temperature contains client_id. 
  //   - chatSettings.embeddingsProvider contains env (prod or test). 
  // When chatSettings is not set (legacy conversations): defaults are first client in prod
  const getComlisClient = (chatSettings) =>{
    let comlisClient
    if (chatSettings.temperature ===0.5) { // for legacy conversations
      comlisClient = djangoProfile?.clients ? djangoProfile.clients[0] : {} 
      comlisClient.env = 'prod'
    } else {
      comlisClient = djangoProfile?.clients?.find(client => client.id === chatSettings.temperature)
      if (!comlisClient) {
        console.error("comlisClient was not found. Using Pharm Nature...")
        comlisClient = clients['pharmnature']
      }
      comlisClient.env = chatSettings.embeddingsProvider
    }
    return comlisClient
  }

  return (
    <DjangoContext.Provider
      value={{
        djangoProfile,
        getComlisClient,
      }}
    >
      {children}
    </DjangoContext.Provider>
  )
}

const getDjangoProfile = (cuiProfile) => {

  const preferedClient = cuiProfile.anthropic_api_key
  const username = cuiProfile.username
  let url = `${process.env.NEXT_PUBLIC_COMLIS_DJANGO_URL}/profile/?email=${username}&client=${preferedClient}`
  // email is for accounts with multiple clients. For those accounts, username should be an email in order to be unique
  return fetch(url)
    .then(response => response.json())
    // .then(json=>JSON.parse(json))
    .catch(error => {
      console.error(`Error fetching django data profile:`, error);
      // TODO XXX display error
    })
}
