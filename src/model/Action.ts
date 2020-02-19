import { model, Schema } from "mongoose";

const actionSchema = new Schema({
    trigger: {
        type: String, 
        required: true
    }, 
    action: {
        actionType: { 
            type: String,
            required: true
        }
    }
});

export default model("Actions", actionSchema);