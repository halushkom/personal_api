import {Schema, model} from 'mongoose';
import {mongo} from "../services/database";
import {ICompany} from '../interface/company_interface'


const companySchema = new Schema<ICompany>({
    // _id: {
    //     type: String,
    //     required: true,
    // },
    companyName: {
        type: String,
    },
    companySite: {
        type: String,
    },
    comment: {
        type: String
    },
})

const Company = mongo.model<ICompany>('company', companySchema)


Company.createRecord = async (data: ICompany) => {
    return Company.create({
        ...data
    })
}

export {Company}
