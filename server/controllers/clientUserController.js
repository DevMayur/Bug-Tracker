import asyncHandler from "express-async-handler";
import Issue from "../models/issueModel.js";
import ProjectModel from "../models/projectModel.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// Sign up a user
//Rout - POST /api/users

const signUpUser = asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body;

    //see if user already exist
    const userEmailExist = await User.findOne({ email: email });

    if (userEmailExist) {
        req.statusCode = 400;
        throw new Error(
            `User already exist with provided email ${email} is provided email`
        );
    }

    const usernameExist = await User.findOne({ username: username });

    if (usernameExist) {
        res.status(400);
        throw new Error(
            `choose different username ${username} is already taken`
        );
    }

    const user = await User.create({
        username,
        email,
        password,
        role,
    });

    if (user) {
        res.status(200).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user.id),
        });
    } else {
        res.status(400);
        throw new Error("Cannot create user");
    }
});

//login / auth user
//Route - POST /api/users/login

const loginUser = asyncHandler(async (req, res) => {
    res.render("login", {});
});

const openDashboard = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const projects = await ProjectModel.find();
        if (projects.length == 0) {
            res.render("dashboard_no_projects", {
                userData: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user.id),
                },
            });
        } else {
            res.render("dashboard", {
                projectsList: projects,
                userData: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user.id),
                },
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

function timeSince(timestamp) {
    let time = Date.parse(timestamp);
    let now = Date.now();
    let secondsPast = (now - time) / 1000;
    let suffix = "ago";

    let intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    for (let i in intervals) {
        let interval = intervals[i];
        if (secondsPast >= interval) {
            let count = Math.floor(secondsPast / interval);
            return `${count} ${i} ${count > 1 ? "s" : ""} ${suffix}`;
        }
    }
}

const openProject = asyncHandler(async (req, res) => {
    try {
        console.log(req.url);

        const project = await ProjectModel.findById(req.params.id);
        const author = await User.findById(project.user);

        const issues = await Issue.find({
            project: project._id.valueOf(),
        });

        res.render("project", {
            projectData: {
                _id: project._id.valueOf(),
                projectName: project.projectName,
                projectDescription: project.projectDescription,
                user: project.user,
                createdAt: project.createdAt,
                age: timeSince(project.createdAt),
                author: author.username,
            },
            issues: issues,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "failed to create a project" });
    }
});

const openCreateProject = asyncHandler(async (req, res) => {
    try {
        console.log(req.url);

        const user = await User.findById(req.params.id);
        res.render("createProject", {
            userData: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "failed to create a project" });
    }
});

//get List of all users
//Route GET /api/users

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.json(users);
});

//get user by id
//Route GET /api/users/:id

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

//update a user
//Route PUT /api/users/:id

const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;

        const updatedUser = await user.save();
        res.json({
            _id: generateToken(updatedUser.id),
            username: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

//delete a user
//Route DELETE /api/users/:id

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await user.remove();
        res.json({
            message: "User deleted succesfully",
        });
    } else {
        res.status(404);
        throw new Error("User not deleted");
    }
});

export {
    signUpUser,
    loginUser,
    openDashboard,
    openCreateProject,
    openProject,
    getUsers,
    getUserById,
    updateUserById,
    deleteUser,
};
