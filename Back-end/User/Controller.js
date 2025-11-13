const User = require("./user").default;
const jwt = require("jsonwebtoken");

exports.CreatUser = async (req, res) => {
  try {
    const userData = new User(req.body);
    await userData.validate();
    await userData.save();
    res.status(201).json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.Get = async (req, res) => {
  try {
    const Users = await User.find().select("-password");
    res.status(201).json(Users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.update = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Utilisateur mis à jour avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const DeletededUser = await User.findByIdAndDelete(req.params.id);
    if (!DeletededUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { Fullname, password } = req.body;
  try {
    const user = await User.findOne({ Fullname });
    if (!user) {
      return res.status(404).json({ message: `utilisateur n'existe pas` });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "le mot de pass est incorect" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        role: user.Role,
        email: user.email,
        tokenVersion: user.tokenVersion,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h", // ⏰ Set token to expire in 24 hours
      }
    );
    res
      .status(200)
      .json({
        user: { id: user._id, name: user.Fullname, role: user.Role },
        token: token,
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
