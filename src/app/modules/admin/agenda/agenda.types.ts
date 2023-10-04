export interface Tag
{
    id?: string;
    title?: string;
}

export interface Agenda
{
    id: string;
    type: 'agenda' | 'section';
    title: string;
    notes: string;
    isactive: boolean;
    duedate: string | null;
    priority: 0 | 1 | 2;
    tags: string[];
    order: number;
}
