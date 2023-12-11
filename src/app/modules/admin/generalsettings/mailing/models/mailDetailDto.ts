export class MailDetailDto{
    emailToId: string;
    emailToName: string;
    emailSubject : string;
    EmailBody: string;

    constructor(emailToId: string, emailToName: string,emailSubject : string , EmailBody: string){
        this.emailToId = emailToId;
        this.emailToName = emailToName;
        this.emailSubject = emailSubject;
        this.EmailBody = EmailBody;
    }
}