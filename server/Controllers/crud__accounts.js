import mongoose from 'mongoose';
import model__accounts from '../Models/model__accounts.js';

export const register = (req, res) => {
    const account = new model__accounts(req.body);
    account.save((err, account) => {
        if (err) {
            return (res.json({ success: false, err }));
        } else {
            return (res.json({ success: true, accountData: account }));
        }
    });
}

export const login = (req, res) => {
    model__accounts.findOne({ email: req.body.email }, (err, account) => {
        if (!account) {
            return res.json({ loginSuccess: false })
        } else {
            account.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch) {
                    return res.json({ loginSuccess: true, _id: account._id, role: account.role });
                }
            })
            account.generateToken((err, account) => {
                if (err) {
                    return res.send(err);
                } else {
                    res.cookie("x_auth", account.token).json({ loginSuccess: true, _id: account._id, role: account.role });
                }
            })
        }
    })
}

export const auth = (req, res) => {
    res.json({
        _id: req._id,
        isAuth: true,
        email: req.account.email,
        role: req.account.role
    })
}

export const logout = (req, res) => {
    model__accounts.findOneAndUpdate({ _id: req.account._id }, { token: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        })
    })
}

export const get__accounts = async (req, res) => {
    try {
        const accounts = await model__accounts.find();
        res.status(200).json(accounts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const get__my__account = async (req, res) => {
    const { id: account_id } = req.params;
    try {
        const participants = await model__accounts.find({ "account": account_id });
        res
            .status(200)
            .json(participants);
    } catch (error) {
        res
            .status(404)
            .json({ message: error.message });
    }
}


export const get__one__account = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const account = await model__accounts.findById(_id);
        res.status(200).json(account);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const post__accounts = async (req, res) => {
    const accounts = req.body;
    const new__accounts = new model__accounts(accounts);
    try {
        await new__accounts.save();
        res.status(201).json(new__accounts);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const patch__accounts = async (req, res) => {
    const { id: _id } = req.params;
    const account = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No account with id: ${_id}`);
    const updated__account = await model__accounts.findByIdAndUpdate(_id, account, { new: true });
    res.json(updated__account);
}

export const delete__accounts = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No account with id: ${_id}`);
    await model__accounts.findByIdAndRemove(_id);

    res.json({ message: "account deleted" });
}

