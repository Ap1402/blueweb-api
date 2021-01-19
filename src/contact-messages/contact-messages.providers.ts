import { ChatData } from "./chat-data/chatDataReceptor.model";
import { ContactMessage } from "./contact-messages.model";
import { ContactMessagesReasons } from "./reasons/contactMessagesReasons.model";

export const contactMessages = [
    {
        provide: 'CONTACT_MESSAGES_REPOSITORY',
        useValue: ContactMessage,
    },

    {
        provide: 'CONTACT_MESSAGES_REASONS_REPOSITORY',
        useValue: ContactMessagesReasons,
    },

    {
        provide: 'CHAT_DATA_REPOSITORY',
        useValue: ChatData,
    },
];