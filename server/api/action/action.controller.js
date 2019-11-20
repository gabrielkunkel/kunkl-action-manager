import Action from "./action.model"

export function add_one_or_update(req, res) {
 
  Action.findOneAndUpdate({ _id: req.action._id }, req.action, { upsert: true, new: true }, function(err, doc) {
    if (err) return res.send(500, { error: err });

    return res.send(doc);
})
  
}

export function get_all_of_user(req, res) {

  Action.find({ user: req.action.user }, function(err, doc) {
    if (err) return res.send(500, { error: err });

    return res.send(doc);
  })

}

export function get_one(req, res) {

  Action.findById(req.action._id, function(err, doc) {
    if (err) return res.send(500, { error: err });

    return res.send(doc);
  })

}

export default {

  add_one_or_update,
  get_all_of_user,
  get_one

}