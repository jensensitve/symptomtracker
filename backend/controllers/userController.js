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
          .json({ msg: "login successful!" });
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
    const { date, meal, symptom, bowelMovement, time } = req.body;

    const newLog = new HealthLog({
      userId,
      date,
      meal,
      symptom,
      bowelMovement,
      time,
    });

    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message);
  }
}

