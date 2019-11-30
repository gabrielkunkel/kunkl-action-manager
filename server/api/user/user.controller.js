import User from './user.model'
import Action from '../action/action.model'
const uuidv4 = require('uuid/v4');

export function add_edit_user(req, res) {

    User.findOneAndUpdate({ _id: req.body._id }, req.body, { upsert: true, new: true, useFindAndModify: false })
        .exec(function(err, user_doc) {
            if (err) return res.send(500, { error: err });
            
            if(!user_doc.master_action) {
                Action.create({
                    _id: uuidv4(),
                    user: user_doc._id,
                    text: 'Master',
                }, function (err, action_doc) {
       
                    if (err) return res.send(500, { error: err });
                    console.log("here is the action_doc: ", action_doc);

                    User.where({ _id: user_doc._id}).update({ master_action: action_doc._id}); // this is not working

                    User.findById(user_doc._id)
                        .exec(function(err, user_doc_update) {
                            if (err) return res.send(500, {error: err});
                            console.log(user_doc_update);
                            res.send(user_doc_update);
                        });
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