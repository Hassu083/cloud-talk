// export type Message = {
//     role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool'
//     content: string
//     id: string
//     name?: string
// }

export type Message = {
    content: string
    role: 'user' | 'assistant'
}

export type UIState = {
    id: string
    display: React.ReactNode
}[]

