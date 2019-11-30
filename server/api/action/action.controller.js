import Action from "./action.model"
const uuidv4 = require('uuid/v4');

export function get_master_action(req, res) {

  Action.findOne({ user: req.query._id, text: 'Master' }, function (err, doc) {
    if (err) return res.send(500, { error: err });
    
    console.log('if there is a doc, it is: ', doc);

    if(!doc) {
        Action.create({
          _id: uuidv4(),
          user: req.query._id,
          text: 'Master',
      }, function (err, action_doc) {
        if (err) return res.send(500, { error: err });
        console.log("here is the new master action_doc: ", action_doc);
        res.send(action_doc);
      })

    } else {
      return res.send(doc);
    }
  })

}

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
  get_master_action,
  add_one_or_update,
  get_all_of_user,
  get_one

}