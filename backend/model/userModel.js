import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name: String,
   customerId: String,
   email: String,
   password: String,
});

export const User = mongoose.model("User", userSchema);

// export default User;


const healthLogSchema = new mongoose.Schema({
   userId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User", // Verweis auf das User-Modell
     required: true,
   },
   date: {
     type: Date,
     required: true,
   },
   meal: String,
   symptom: String,
   bowelMovement: String,
   time: String, // Angenommen, du möchtest die Uhrzeit separat speichern
 });
 
 export const HealthLog = mongoose.model("HealthLog", healthLogSchema);
 
//  export default HealthLog;