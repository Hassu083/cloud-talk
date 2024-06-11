import * as React from 'react'

// import { shareChat } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconShare } from '@/components/ui/icons'
import { FooterText } from '@/components/footer'
// import { ChatShareDialog } from '@/components/chat-share-dialog'
// import { useAIState, useActions, useUIState } from 'ai/rsc'
import { nanoid } from 'nanoid'
import { UserMessage } from './stocks/message'
import { Message } from '@/lib/chat/actions'

export interface ChatPanelProps {
  id?: string
  title?: string
  input: string
  setInput: (value: string) => void
  isAtBottom: boolean
  scrollToBottom: () => void
  messages: Message[]
  setMessages: any
  sendMessageHandler: (value: string) => void
}

export function ChatPanel({
  id,
  title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom,
  messages,
  setMessages,
  sendMessageHandler
}: ChatPanelProps) {
  // const [aiState] = useAIState()
  // const [messages, setMessages] = useUIState<typeof AI>()
  // const { submitUserMessage } = useActions()
  // const [messages, setMessages] = React.useState<any[]>()

  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)

  const exampleMessages = [
    {
      heading: 'Deploy a new',
      subheading: 'web application to AWS',
      message: "I want to deploy a new web application to AWS. Can you help me with that?"
    },
    {
      heading: 'Create a high-memory',
      subheading: 'virtual machine on Azure',
      message: "I need to create a high-memory virtual machine on Azure. Can you guide me through the deployment process?"
    },
    {
      heading: 'Update the security settings',
      subheading: 'of my existing GCP deployment',
      message: "I'd like to update the security settings of a deployment I already have on GCP. Can you walk me through the steps?"
    },
    {
      heading: 'Schedule an automatic deployment',
      subheading: 'for my code every Friday',
      message: "Is it possible to schedule automatic deployments for my code every Friday? Can you help me set that up?"
    }
  ]

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
          {messages.length === 0 &&
            exampleMessages.map((example, index) => (
              <div
                key={example.heading}
                className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${index > 1 && 'hidden md:block'
                  }`}
                onClick={async () => {
                  console.log(`Example message: ${example.message}`)
                    setMessages((currentMessages: any) => [
                      ...currentMessages,
                      {
                        role: 'user',
                        content: example.message
                      }
                    ])

                    const responseMessage = sendMessageHandler(
                      example.message
                    )
                }}
              >
                <div className="text-sm font-semibold">{example.heading}</div>
                <div className="text-sm text-zinc-600">
                  {example.subheading}
                </div>
              </div>
            ))}
        </div>

        {messages?.length >= 2 ? (
          <div className="flex h-12 items-center justify-center">
            <div className="flex space-x-2">
              {id && title ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShareDialogOpen(true)}
                  >
                    <IconShare className="mr-2" />
                    Share
                  </Button>
                  {/* <ChatShareDialog
                    open={shareDialogOpen}
                    onOpenChange={setShareDialogOpen}
                    onCopy={() => setShareDialogOpen(false)}
                    shareChat={shareChat}
                    chat={{
                      id,
                      title,
                      messages: aiState.messages
                    }}
                  /> */}
                </>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm input={input} setInput={setInput} setMessages={setMessages} sendMessageHandler={sendMessageHandler}/>
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  )
}
