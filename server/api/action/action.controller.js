import Action from "./action.model"
const uuidv4 = require('uuid/v4');

export function get_master_action(req, res) {

  Action.findOne({
    user: req.query._id,
    text: 'Master'
  }, function (err, doc) {
    if (err) return res.send(500, {
      error: err
    });

    if (!doc) {
      Action.create({
        _id: uuidv4(),
        user: req.query._id,
        text: 'Master',
      }, function (err, action_doc) {
        if (err) return res.send(500, {
          error: err
        });
        console.log("here is the new master action_doc: ", action_doc);
        res.send(action_doc);
      })

    } else {
      Action.find({'_id': {$in: doc.child_actions }}, function (err, child_action_docs) {
        
        doc.child_actions = child_action_docs;
        return res.send(doc);
      });
    }
  })

}

export function add_action(req, res) {

  Action.create(req.body, function (err, doc) {
    if (err) return res.send(500, {
      error: err
    });

    Action.findOneAndUpdate({
      _id: doc.parent_actions[0]
    }, {
      $push: {
        child_actions: doc._id
      }
    }, {
      useFindAndModify: false, new: true
    }, function(err, master_doc) {
      if (err) return res.send(500, {
        error: err
      });
    });


    return res.send(doc);
  })

}

export function get_all_of_user(req, res) {

  Action.find({
    user: req.action.user
  }, function (err, doc) {
    if (err) return res.send(500, {
      error: err
    });



    return res.send(doc);
  })

}

export function get_one(req, res) {

  Action.findById(req.action._id, function (err, doc) {
    if (err) return res.send(500, {
      error: err
    });

    return res.send(doc);
  })

}

export default {
  get_master_action,
  add_action,
  get_all_of_user,
  get_one

}