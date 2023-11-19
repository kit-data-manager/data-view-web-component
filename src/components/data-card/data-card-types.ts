import { DataCard } from "./data-card"

export type ValueLabelObj = {
    value: string,
    label: string,
}

export type ValueLabelObjWithUrl = ValueLabelObj & {
    url: string,
}

export type Tag = {
    text: string,
    color: string,
    url?: string,
    iconName?: string,
}

export type DownloadObj = {
    label: string,
    url: string,
    position?: 'metadata-container'
}

export type EditEvent = {
    object: DataCard
}

export type TextPropType = string | ValueLabelObj