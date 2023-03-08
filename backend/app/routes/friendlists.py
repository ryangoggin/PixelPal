from flask import jsonify, request, Blueprint
from app.models import db, FriendList

# create a blueprint for friend list routes
friendlists_bp = Blueprint('friendlists', __name__)

# route to get all friend lists
# GET /friendlists - get all friend lists

@friendlists_bp.route('/', methods=['GET'])
def get_all_friend_lists():
    # get all friend lists from the database
    friendlists = FriendList.query.all()
    # convert each friend list to a dictionary and return as JSON
    return jsonify([friendlist.to_dict() for friendlist in friendlists]), 200

# route to create a new friend list
# POST /friendlists - create a new friend list

@friendlists_bp.route('/', methods=['POST'])
def create_friend_list():
    # get the data from the request body
    data = request.get_json()
    user_id = data.get('user_id')
    friend_id = data.get('friend_id')
    mutual = data.get('mutual')

    # create a new friend list object
    friendlist = FriendList(user_id=user_id, friend_id=friend_id, mutual=mutual)
    # add the friend list to the database
    db.session.add(friendlist)
    db.session.commit()

    # return the new friend list as JSON
    return jsonify(friendlist.to_dict()), 201

# route to get a specific friend list by ID
# GET /friendlists/:id - get a specific friend list by ID

@friendlists_bp.route('/<int:id>', methods=['GET'])
def get_friend_list(id):
    # get the friend list from the database by ID
    friendlist = FriendList.query.get(id)
    # if the friend list doesn't exist, return an error message
    if friendlist is None:
        return jsonify({'error': 'Friend list not found'}), 404

    # otherwise, return the friend list as JSON
    return jsonify(friendlist.to_dict()), 200

# route to update a specific friend list by ID
# PUT /friendlists/:id - update a specific friend list by ID

@friendlists_bp.route('/<int:id>', methods=['PUT'])
def update_friend_list(id):
    # get the friend list from the database by ID
    friendlist = FriendList.query.get(id)
    # if the friend list doesn't exist, return an error message
    if friendlist is None:
        return jsonify({'error': 'Friend list not found'}), 404

    # get the data from the request body
    data = request.get_json()
    user_id = data.get('user_id')
    friend_id = data.get('friend_id')
    mutual = data.get('mutual')

    # update the friend list object with the new data
    friendlist.user_id = user_id or friendlist.user_id
    friendlist.friend_id = friend_id or friendlist.friend_id
    friendlist.mutual = mutual or friendlist.mutual

    # save the changes to the database
    db.session.commit()

    # return the updated friend list as JSON
    return jsonify(friendlist.to_dict()), 200

# route to delete a specific friend list by ID
# DELETE /friendlists/:id - delete a specific friend list by ID

@friendlists_bp.route('/<int:id>', methods=['DELETE'])
def delete_friend_list(id):
    # get the friend list from the database by ID
    friendlist = FriendList.query.get(id)
    # if the friend list doesn't exist, return an error message
    if friendlist is None:
        return jsonify({'error': 'Friend list not found'}), 404

    # delete the friend list from the database
    db.session.delete(friendlist)
    db.session.commit()

    # return a message indicating that the friend list was deleted
    return jsonify({'message': 'Friend list deleted'}
