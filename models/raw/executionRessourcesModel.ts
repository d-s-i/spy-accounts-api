import mongoose from "mongoose";
import { BuiltinInstanceCounterModel } from "./builtinInstanceCounterModel";

const executionRessourcesSchema = new mongoose.Schema({
    n_steps: {
        type: Number,
        // required: [true, "An ressource must have a number of steps (n_steps)"]
    },
    builtin_instance_counter: {
        type: BuiltinInstanceCounterModel.schema,
        // required: [true, "An execution ressource must have a builtin instance counter (builtin_instance_counter)"]

    },
    n_memory_holes: {
        type: Number,
        // required: [true, "An execution ressource must have a number of memory holes (n_memory_holes)"]
    }
});

export const ExecutionRessourcesModel = mongoose.model("ExecutionRessourcesModel", executionRessourcesSchema);