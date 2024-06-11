'use client'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useEffect, useRef, useState } from 'react'
// import { useUIState, useAIState } from 'ai/rsc'
import { Session } from '@/lib/types'
import { usePathname, useRouter } from 'next/navigation'
import { Message } from '@/lib/chat/actions'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import { toast } from 'sonner'

export interface ChatProps extends React.ComponentProps<'div'> {
    initialMessages?: Message[]
    id?: string
    session?: Session
    missingKeys: string[]
}

interface AssistantMessage {
    content: string;
}

export function Chat({ id, className, session, missingKeys }: ChatProps) {
    const router = useRouter()
    const path = usePathname()
    const [input, setInput] = useState('')
    const [_, setNewChatId] = useLocalStorage('newChatId', id)

    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState('');

    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const socketUrl = "ws://127.0.0.1:8000/message"
        const socket = new WebSocket(socketUrl)
        socketRef.current = socket

        socket.addEventListener('open', () => {
            console.log('Connected to assistant.');
        });

        socket.addEventListener('message', (event) => {
            const data: string = event.data;
            setMessages((prevMessages) => [...prevMessages, {role: 'assistant', content: data}]);
        });

        // return () => { socket.close() };
    }, []);

    // const sendMessage = () => {
    //     if (socket && message) {
    //         socket.emit('message', message);
    //         setMessage('')
    //     }
    // }

    const sendMessageHandler = (value: string) => {
        if (value && socketRef.current) {
            console.log('Sending message.')
            socketRef.current.send(value)
        } else {
            console.log(`Message: ${value}, Socket: ${socketRef.current}`)
        }
    }

    // useEffect(() => {
    //     if (session?.user) {
    //         if (!path.includes('chat') && messages.length === 1) {
    //             window.history.replaceState({}, '', `/chat/${id}`)
    //         }
    //     }
    // }, [id, path, session?.user, messages])

    // useEffect(() => {
    //     const messagesLength = aiState.messages?.length
    //     if (messagesLength === 2) {
    //         router.refresh()
    //     }
    // }, [aiState.messages, router])

    useEffect(() => {
        setNewChatId(id)
    })

    useEffect(() => {
        missingKeys.map(key => {
            toast.error(`Missing ${key} environment variable!`)
        })
    }, [missingKeys])

    const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
        useScrollAnchor()

    return (
        <div
            className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
            ref={scrollRef}
        >
            <div
                className={cn(messages.length === 0 ? 'pb-[320px] pt-4 md:pt-10' : 'pb-[140px] pt-4 md:pt-10', className)}
                ref={messagesRef}
            >
                {messages.length ? (
                    <ChatList messages={messages} isShared={false} session={session} />
                ) : (
                    <EmptyScreen />
                )}
                <div className="h-px w-full" ref={visibilityRef} />
            </div>  
            <ChatPanel
                id={id}
                input={input}
                setInput={setInput}
                isAtBottom={isAtBottom}
                scrollToBottom={scrollToBottom}
                messages={messages}
                setMessages={setMessages}
                sendMessageHandler={sendMessageHandler}
            />
        </div>
    )
}