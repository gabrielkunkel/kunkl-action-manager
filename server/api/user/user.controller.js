import User from './user.model'
import Action from '../action/action.model'
const uuidv4 = require('uuid/v4');

export function add_edit_user(req, res) {

    User.findOneAndUpdate({ _id: req.body._id }, req.body, { upsert: true, new: true, useFindAndModify: false })
        .populate("Action")
        .exec(function(err, user_doc) {
            if (err) return res.send(500, { error: err });

            if(!user_doc.master_action) {

                Action.create({
                    _id: uuidv4(),
                    user: user_doc._id,
                    text: 'Master',
                }, function (err, action_doc) {
                    if (err) return res.send(500, { error: err });

                    // update user with master_action

                    user_doc.master_action = action_doc;
                    res.send(user_doc);
                });
              
            }
            else {
                return res.send(user_doc);
            }
    })

}

export function get_user(req, res) {

    User.findById(req.user._id, function(err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send(doc);
    })

}

export default {
    add_edit_user,
    get_user,
}