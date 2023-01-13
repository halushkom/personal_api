import {Schema, model} from 'mongoose';
import {mongo} from "../services/database";
import {IRecruiter} from '../interface/recriiter_interface'


const recruiterSchema = new Schema<IRecruiter>({
    _id: {
        type: String,
        required: true,
    },
    recriterFullName: {
        type: String,
        required: true,
    },
    meil: {
        type: String
    },
    mobile: {
        type: String,
    },
    linkedinId: {
        type: String
    },
    comment: {
        type: String
    },
})

const Company = mongo.model<IRecruiter>('recruiter', recruiterSchema)