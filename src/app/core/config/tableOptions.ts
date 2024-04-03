import { Table } from "../../domain/question";

export const tableOption: Table[] = [
    {
        def: 'account',
        label: 'Account',
        type:'text',
        data:'account'
    },
    {
        def: 'dueDate',
        label: 'DueDate',
        type:'date',
        data:'dueDate'
    },
    {
        def: 'amount',
        label: 'Amount',
        type:'currency',
        data:'amount'
    },
    {
        def: 'period',
        label: 'Period',
        type:'periodDate',
        data:'period.to',
        data2:'period.from'

    },
]