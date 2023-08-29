import userModel from "../model/userModel.js";
import HealthLog from "../model/healthLogModel.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import bcrypt from "bcrypt";
import { createToken } from "../lib/auth.js";
import { v4 as uuid } from 'uuid';

export async function createUserController(req, res) {
  try {
    const saltRound = 12;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedSaltedPassword = await bcrypt.hash(req.body.password, salt);
    const customerId = uuid();

    req.body.password = hashedSaltedPassword;

    const newUser = userModel({
      ...req.body,
      password: hashedSaltedPassword,
      customerId: customerId,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function loginUserController(req, res) {

  //   try {
  //     const user = await userModel.findOne({ email: req.body.email })
  //     console.log(user)

  //     if (user) {
  //         const isMatching = await bcrypt.compare(req.body.password, user.password)
  //         if (isMatching) {
  //             const token = await createToken({customerId: user.customerId, userId:user._id},{expiresIn: "1h"});
  //             console.log({token});
  //             return res.status(200).cookie("jwt", token, {httpOnly:true}).json({message:"Login successful!"});
  //         }
  //         return res.status(401).json({message:"Access denied! Invalid credentials."})
  //     }
  //     return res.status(404).json({message:"User not found!"});

  // } catch (err) {
  //     res.status(500).json(err)
  // }

  try {
    const user = await userModel.findOne({ email: req.body.email });
    console.log({ user });

    if (user) {
      const isMatching = await bcrypt.compare(req.body.password, user.password);
      console.log(isMatching);
      if (isMatching) {
        const token = await createToken({
          customerId: user.customerId,
          userId: user._id
        },
          // {expiresIn: "1h"}
        );
        // option (Token Gültigkeit 1 Stunde)
        return res
          .status(200)
          .cookie("jwt", token, { httpOnly: true })
          .json({ msg: "LOGIN erfolgreich!" });
      }

      return res
        .status(401)
        .json({ message: "Access denied! Invalid credentials." });
    }

    return res.status(404).json({ message: "User not found!" });


  } catch (error) {
    res.status(500).json(error);
  }
}

// export async function userLogoutController(req, res) {
//   try {
//     const token = req.cookies.jwt; // Das JWT-Token aus den Cookies holen
//     const decodedToken = await validateToken(token); // Das Token entschlüsseln

//     if (decodedToken.userId === req.user.userId) {
//       // Vergleiche die Benutzer-ID im Token mit der aktuellen Benutzer-ID
//       res.clearCookie("jwt"); // Lösche das JWT-Cookie
//       res.status(200).json({ message: "Logout erfolgreich" });
//     } else {
//       res.status(403).json({ message: "Nicht autorisiert zum Ausloggen" });
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// }

export async function userLogoutController(req, res) {
  try {
    res.clearCookie("jwt"); // Lösche das JWT-Cookie
    res.status(200).json({ message: "Logout erfolgreich" });
  } catch (error) {
    res.status(500).json(error);
  }
}


export async function getAllUsersController(req, res) {
  try {
    const allUsers = await userModel.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json(error);
  }
}

// Id (und Name) des eingeloggten User---
export async function getUserController(req, res) {
  try {
    const userId = req.user.userId; // Assuming your authentication middleware sets the userId in req.user
    const user = await userModel.findOne({ _id: userId });
    
    if (user) {
      const userName = user.name;
      return res.status(200).json({ name: userName });
    } else {
      return res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function addHealthLogController(req, res) {
  try {
    const userId = req.user.userId; // Zugriff auf die Benutzer-ID aus dem authMiddleware
    const { date, mahlzeit, symptom, stuhlgang, zeit } = req.body;

    const newLog = new HealthLog({
      userId,
      date,
      mahlzeit,
      symptom,
      stuhlgang,
      zeit,
    });

    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message);
  }
}

export async function getAllForUserController(req, res) {
  try {
    const userId = req.user.userId; // Annahme: Die Benutzer-ID wird im authMiddleware festgelegt
    const userLogs = await HealthLog.find({ userId }).sort({ date: 1 });
    res.status(200).json(userLogs);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function deleteHealthLogController(req, res) {
  try {
    const userId = req.user.userId; // Annahme: Die Benutzer-ID wird im authMiddleware festgelegt
    const { selectedEntries } = req.body;

    // Prüfen, ob der Benutzer der Eigentümer der ausgewählten Einträge ist
    const userLogs = await HealthLog.find({ userId, _id: { $in: selectedEntries } });
    if (userLogs.length !== selectedEntries.length) {
      return res.status(403).json({ message: "Nicht autorisiert zum Löschen der ausgewählten Einträge" });
    }

    // Lösche die ausgewählten Einträge
    const deletionResult = await HealthLog.deleteMany({ _id: { $in: selectedEntries } });
    if (deletionResult.deletedCount === selectedEntries.length) {
      res.status(200).json({ message: "Ausgewählte Einträge erfolgreich gelöscht" });
    } else {
      res.status(500).json({ message: "Fehler beim Löschen der ausgewählten Einträge" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}