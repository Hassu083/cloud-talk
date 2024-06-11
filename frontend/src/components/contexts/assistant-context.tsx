// import React, { createContext, useState } from 'react';

// interface AssistantContextProps {
//   messages: string[];
//   addMessage: (message: string) => void;
// }

// export const AssistantContext = createContext<AssistantContextProps>({
//   messages: [],
//   addMessage: () => {},
// });

// export const AssistantProvider: React.FC = ({ children }) => {
//   const [messages, setMessages] = useState<string[]>([]);

//   const addMessage = (message: string) => {
//     setMessages((prevMessages) => [...prevMessages, message]);
//   };

//   return (
//     <AssistantContext.Provider value={{ messages, addMessage }}>
//       {children}
//     </AssistantContext.Provider>
//   );
// };
