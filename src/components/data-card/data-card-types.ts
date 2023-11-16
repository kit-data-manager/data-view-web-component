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
    iconURL?: string,
}

export type TextPropType = string | ValueLabelObj