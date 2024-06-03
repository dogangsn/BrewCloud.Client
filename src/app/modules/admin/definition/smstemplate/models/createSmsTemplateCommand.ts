export class CreateSmsTemplateCommand {
    active: boolean;
    templateName: string;
    templateContent: string;
    enableSMS?: boolean;
    enableAppNotification?: boolean;
    enableEmail?: boolean;
    enableWhatsapp?: boolean;

    constructor(
        active: boolean = false,
        templateName: string = '',
        templateContent: string = '',
        enableSMS?: boolean,
        enableAppNotification?: boolean,
        enableEmail?: boolean,
        enableWhatsapp?: boolean
      ) {
        this.active = active;
        this.templateName = templateName;
        this.templateContent = templateContent;
        this.enableSMS = enableSMS;
        this.enableAppNotification = enableAppNotification;
        this.enableEmail = enableEmail;
        this.enableWhatsapp = enableWhatsapp;
      }
}