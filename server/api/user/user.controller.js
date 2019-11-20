import User from './user.model'

export function add_edit_user(req, res) {

    User.findOneAndUpdate({ _id: req.user._id }, req.user, { upsert: true, new: true }, function(err, doc) {
        if (err) return res.send(500, { error: err });

        return res.send(doc);
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