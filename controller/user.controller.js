const User = require("../model/user.model");
const bcrypt = require('bcrypt');
// const JsonWebToken = require('jsonwebtoken');
const passport = require('passport')

/*----------------- TodoList With PassPort & EJS ---------------------*/

exports.register = async (req, res) => {
    try {

      let user = await User.findOne({ email: req.body.email, isDelete: false });

      if (user) {
        return res.status(400).json({ message: "User Already Exists." });
      }
      let hashpassword = await bcrypt.hash(req.body.password, 10);
      user = await User.create({ ...req.body, password: hashpassword });
      // console.log(user);
      res.status(201).redirect('user');
    } catch (err) {
      // Send error response once
      console.error(err);
      res.render('register');
    }
  };

exports.todolist = async (req,res)=>{
    try {
      console.log("hii");
        const users = await User.find({});
        if (users.length > 0) {
          console.log(users);
          return res.render('user', { users });  // Pass the users array to the EJS template
      } else {
          res.status(400).send("No users found");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({mesg:"internal Server Error"})
    }
}

// exports.updateProfile = async (req, res) => {
//     try {
//         let user = req.user;
//         console.log(user);

//         user = await User.findByIdAndUpdate(
//             user._id,
//             { $set: req.body },
//             { new: true }
//         );
//         res.status(202).json({ user, message: "user Update Success" });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Internal Server Error" })
//     }
// }

// exports.deleteProfile = async (req, res) => {
//     try {
//         let user = req.user;
//         // console.log(user);
//         user = await User.findByIdAndDelete(
//             user._id,
//             { $set: { isDelete: true } },
//             { new: true }
//         );
//         res.status(202).json({ user, message: "user Delete Success" });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Internal Server Error" })
//     }
// }

// exports.changePassword = async (req, res) => {
//     try {
//         const { email, oldPassword, newPassword, conformPassword } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         const isMatch = await bcrypt.compare(oldPassword, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Incorrect old password' });
//         }
//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         user.password = hashedPassword;
//         await user.save();
//         res.json({ message: 'Password changed successfully' });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Internal Server Error" })
//     }
// }

// exports.specialUser = async (req, res) => {
//     try {
//         let user = {
//             firstName: "Dev",
//             lastName: "Bharadva",
//             email: "Dev@dev.in",
//             mobileNo: "4959697878",
//             Address: {
//                 line1: "City Center",
//                 line2: "Amroli Surat"
//             }
//         }
//         // let user = await User.findOne({firstName:req.query.name,isDelete:false})
//         if (!user) {

//             return res.render('user.ejs', { user });
//         }

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internla Server Erorr" });
//     }
// }

