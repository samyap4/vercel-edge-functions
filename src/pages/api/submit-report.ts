import { NextApiRequest, NextApiResponse } from 'next';
import { createKysely } from '@vercel/postgres-kysely';
import { Generated } from 'kysely';
import { DateTime } from 'luxon';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const payload = req.body;
    const { amount, submitter_id, merchant, description } = payload;

    try {
        const db_result = await createExpenseReport(payload);
        const report_id = db_result[0].report_id.toString();
    
        // const fga_payload: FGAWriteTuple = {
        //     user: `employee:${payload.submitter_id}`,
        //     relation: 'submitter',
        //     object: `report:${report_id}`
        // }
    
        // const fga_token = await getFGAJWT();
    
        // if (fga_payload && fga_token) {
        //     await writeTuple(fga_token, fga_payload);
        //     return res.status(201).json({
        //         report_id: report_id,
        //         amount: amount,
        //         merchant: merchant,
        //         submitter_id: submitter_id,
        //         description: description
        //     })
        // }
        return res.status(201).json({
            result: db_result
        })
    } catch (e) {
        return res.status(400).json({
            result: 'Bad Request',
            error: e
        })
    }
};


 
interface Database {
  'expense_reports': ExpenseReportsTable;
}

interface ExpenseReportsTable {
    report_id: Generated<number>;
    amount: number;
    merchant: string;
    description: string;
    submitter_id: string;
    approver_id?: string;
    approved_date?: Date;
    submitted_date: Date;
}
 
const db = createKysely<Database>();

export async function createExpenseReport(payload: createExpenseReportDto) {
    const { amount, merchant, description, submitter_id } = payload;
    const today = DateTime.now().toJSDate();

    const result = await db
        .insertInto('expense_reports')
        .values({ amount: amount, merchant: merchant, description: description, submitter_id: submitter_id, submitted_date: today })
        .returning('report_id')
        .execute();
    
    return result;
}

export type createExpenseReportDto = {
    amount: number;
    merchant: string;
    description: string;
    submitter_id: string;
}