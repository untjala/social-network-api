const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addAFriend,
  removeFriend
} = require('../../controllers/userController');

router.route('/')
.get(getUsers)
.post(createUser);

router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

router.route('/:userId/friend/friendId')
.post(addAFriend)
.delete(removeFriend);


module.exports = router;
