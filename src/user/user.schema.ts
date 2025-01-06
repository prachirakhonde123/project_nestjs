import * as mongoose from 'mongoose';

// Define the User interface with correct types
export interface User extends mongoose.Document {
    _id : String,
    username: string;
    password: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}

// Define the schema structure for the User model
const UserSchema = new mongoose.Schema({
    _id: { type: String },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// Create and export the model
export const UserModel = mongoose.model<User>('User', UserSchema);

/*
The * as syntax is used to import everything from a module as a single object
(namespace).
import * as mongoose from 'mongoose' is a way to import all the functionalities
provided by the Mongoose library into a single mongoose object. It gives you 
access to all Mongoose features, including schema definitions, model creation, 
and database interactions, and helps organize your imports in a clear 
and consistent manner.

interface User
Defines a custom TypeScript interface named User.
This interface specifies the structure (schema) of a user document in the database.

extends mongoose.Document :-
The mongoose.Document is a built-in interface in Mongoose that represents a MongoDB document.
By extending mongoose.Document, the User interface inherits all the properties and 
methods that Mongoose adds to a document, such as:
_id: A unique identifier for the document.
save(): A method to save the document to the database.
remove(): A method to delete the document.
populate(): A method to populate references in the document.
Other methods and properties provided by Mongoose.

This interface is used to ensure type safety when working with Mongoose models.
A schema defines the structure of the data, while the interface defines the
TypeScript typing for the documents.

*/
