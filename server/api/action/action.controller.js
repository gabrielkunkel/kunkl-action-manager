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
      _id: doc.parent_actions[req.body.parent_actions.length-1]
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

export function nest_child_action (req, res) {

  let updateNewChild = Action.findOneAndUpdate({
    _id: req.query.newchild
  }, {
    $push: {
      parent_actions: req.query.newparent
    }
  }, {
    useFindAndModify: false, new: true
  }).exec();

  let updateNewParent = Action.findOneAndUpdate({
    _id: req.query.newparent
  }, {
    $push: {
      child_actions: req.query.newchild
    }
  }, {
    useFindAndModify: false, new: true
  }).exec();

  let updateOldParent = Action.findOneAndUpdate({
    _id: req.query.oldparent
  }, {
    $pull: {
      child_actions: req.query.newchild
    }
  }, {
    useFindAndModify: false, new: true
  }).exec();
  
  Promise.all([updateNewChild, updateNewParent, updateOldParent])
    .then( ([newChildUpdated, newParentUpdated, oldParentUpdated]) => {
      if (
        newChildUpdated.parent_actions.includes(req.query.newparent) &&
        newParentUpdated.child_actions.includes(req.query.newchild) &&
        !oldParentUpdated.child_actions.includes(req.query.newchild)
      ) {
        res.send({db_success: true });
      }
      else {
        res.send({db_success: false});
      }
    });

}

export function sort_update(req, res) {

  Action.findOneAndUpdate({
    _id: req.query.action
  }, {
    child_actions: req.body.newArray
  }, {
    useFindAndModify: false, new: true
  })
    .populate("child_actions")
    .exec()
    .then(result => {
      res.send(result);
    });

}

export function get_action(req, res) {

  Action.findOne({ _id: req.query._id})
    .populate("child_actions")
    .populate("parent_actions")
    .populate("twin_actions")
    .exec()
    .then(result => {
      res.send(result);
    });

}


export function nest_child_up_parent_list (req, res) {

  let newChildParentsToRemovePromise = Action.findById(req.query.newchild).exec()
  newChildParentsToRemovePromise.then(action => {

    let newparents = [];

    for (let i = 0; i < action.parent_actions.length; i += 1) {
      if (action.parent_actions[i] === req.query.newparent) {
        newparents.push(action.parent_actions[i]);
        break;
      } else {
        newparents.push(action.parent_actions[i]);
      }
    }

    console.log("new parents array is: ", newparents);
    
    let updateNewChild = Action.findOneAndUpdate({
      _id: req.query.newchild
    }, {
        parent_actions: newparents
    }, {
      useFindAndModify: false, new: true
    }).exec();
  
    let updateNewParent = Action.findOneAndUpdate({
      _id: req.query.newparent
    }, {
      $push: {
        child_actions: req.query.newchild
      }
    }, {
      useFindAndModify: false, new: true
    }).exec();
  
    let updateOldParent = Action.findOneAndUpdate({
      _id: req.query.oldparent
    }, {
      $pull: {
        child_actions: req.query.newchild
      }
    }, {
      useFindAndModify: false, new: true
    }).exec();
    
    Promise.all([updateNewChild, updateNewParent, updateOldParent])
      .then( ([newChildUpdated, newParentUpdated, oldParentUpdated]) => {
        if (
          newChildUpdated.parent_actions.length === newparents.length &&
          newParentUpdated.child_actions.includes(req.query.newchild) &&
          !oldParentUpdated.child_actions.includes(req.query.newchild)
        ) {
          res.send({db_success: true });
        }
        else {
          res.send({db_success: false});
        }
      });

  });

}

export default {
  get_master_action,
  add_action,
  nest_child_action,
  sort_update,
  get_action,
  nest_child_up_parent_list
}