export class UpdateSmsTemplateCommand {
    id : string;
    active: boolean;
    templateName: string;
    templateContent: string;
    enableSMS?: boolean;
    enableAppNotification?: boolean;
    enableEmail?: boolean;
    enableWhatsapp?: boolean;

    constructor(
        id: string,
        active: boolean = false,
        templateName: string = '',
        templateContent: string = '',
        enableSMS?: boolean,
        enableAppNotification?: boolean,
        enableEmail?: boolean,
        enableWhatsapp?: boolean
      ) {
        this.id = id;
        this.active = active;
        this.templateName = templateName;
        this.templateContent = templateContent;
        this.enableSMS = enableSMS;
        this.enableAppNotification = enableAppNotification;
        this.enableEmail = enableEmail;
        this.enableWhatsapp = enableWhatsapp;
      }
}