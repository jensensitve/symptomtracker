import mongoose from "mongoose";



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
    mahlzeit: String,
    symptom: String,
    stuhlgang: String,
    zeit: String, // Angenommen, du möchtest die Uhrzeit separat speichern
  });
const HealthLog = mongoose.model("HealthLog", healthLogSchema);
  
export default HealthLog;