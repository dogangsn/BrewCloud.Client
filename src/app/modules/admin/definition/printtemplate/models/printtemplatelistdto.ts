import { PrintType } from "./printType.enum";

export class PrintTemplateListDto {
    templateName: string = '';
    type: PrintType;
    htmlContent: string = '';   
}