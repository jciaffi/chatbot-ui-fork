"use client"

import { DjangoContext } from "@/context/djangoProfile" // COMLIS
import { IconInfoCircle } from "@tabler/icons-react"
import { FC, useContext } from "react"
import { ModelSelect } from "../models/model-select"
import { AdvancedSettings } from "./advanced-settings"
import { Checkbox } from "./checkbox"
import { Label } from "./label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./select"
import { Slider } from "./slider"
import { TextareaAutosize } from "./textarea-autosize"
import { WithTooltip } from "./with-tooltip"

export const ComlisChatSettingsForm = ({
  chatSettings,
  onChangeChatSettings,
  useAdvancedDropdown = true,
  showTooltip = true
}) => {
  const { djangoProfile, getComlisClient } = useContext(DjangoContext)
  const comlisClient = getComlisClient(chatSettings)

  if (!djangoProfile) return null

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label>Clients</Label>

        <Select
          value={comlisClient?.id}
          onValueChange={comlisClientID => {
            onChangeChatSettings({
              ...chatSettings,
              temperature: comlisClientID
            })
          }}
        >
          <SelectTrigger>
            <SelectValue defaultValue={djangoProfile.clients[0].name} />
          </SelectTrigger>

          <SelectContent>
            {djangoProfile.clients.map(client => (
              <SelectItem value={client.id} key={client.id}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>Environnement</Label>

        <Select
          value={comlisClient?.env}
          onValueChange={comlisClientID => {
            onChangeChatSettings({
              ...chatSettings,
              embeddingsProvider: comlisClientID
            })
          }}
        >
          <SelectTrigger>
            <SelectValue defaultValue="prod" />
          </SelectTrigger>

          <SelectContent>
            {["test", "prod"].map(val => (
              <SelectItem value={val} key={val}>
                {val}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
