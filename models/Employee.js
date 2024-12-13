import mongoose from 'mongoose';

// Define the employee schema with the required fields
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    isManager: {
        type: Boolean,
        required: true
    }
});

// Create a model based on the schema
const Employee = mongoose.model('Employee', employeeSchema);

// Export the model for use in other parts of the application
export { Employee };
