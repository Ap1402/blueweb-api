import { ContactMessage } from "./contact-messages.model";

export const contactMessages = [
    {
        provide: 'CONTACT_MESSAGES_REPOSITORY',
        useValue: ContactMessage,
    },
];