import mongoose from "mongoose"; 
import { Model, models, Schema } from "mongoose";


interface ISettings {
    ownerId: string;
    buisnessTitle: string;
    supportEmail: string;
    knowledge: string;
}

const settingSchema  = new Schema<ISettings>({
    ownerId : {
        type : String,
        unique : true,
    },
    buisnessTitle : {
        type : String,
        
    },
    supportEmail : {
        type : String,
        
    },
    knowledge : {
        type : String,
    }
}, {timestamps : true}) ;
const Settings = mongoose.models.Settings || mongoose.model("Settings", settingSchema)
export default Settings;