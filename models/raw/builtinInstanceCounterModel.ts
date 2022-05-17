import mongoose from "mongoose";

const builtinInstanceCounterSchema = new mongoose.Schema({
    pedersen_builtin: {
        type: Number, 
        // required: [true, "A builtin instance counter must have a predersen builtin"]
    },
    range_check_builtin: {
        type: Number, 
        // required: [true, "A builtin instance counter must have a range check builtin"]
    },
    ecdsa_builtin: {
        type: Number, 
        // required: [true, "A builtin instance counter must have an excdsa builtin"]
    },
    output_builtin: {
        type: Number, 
        // required: [true, "A builtin instance counter must have an output builtin"]
    },
    bitwise_builtin: {
        type: Number, 
        // required: [true, "A builtin instance counter must have a bitwise builtin"]
    },
    ec_op_builtin: {
        type: Number, 
        // required: [true, "A builtin instance counter must have an ec op builtin"]
    }
});

export const BuiltinInstanceCounterModel = mongoose.model("BuiltinInstanceCounterModel", builtinInstanceCounterSchema);