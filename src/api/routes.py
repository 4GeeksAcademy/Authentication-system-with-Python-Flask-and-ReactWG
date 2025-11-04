"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route("/token", methods=['POST'])
def generate_token ():
    #login credentials
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    #query database to check if user email exist
    email= email.lower()
    user= User.query.filter_by(email=email).first()

    #create condition to check if user doesnt exist or password incorrect
    if user is None:
        return jsonify({'message': 'Email or password does not match'}), 401
    elif user is not None and user.password != password:
        return jsonify({'message': 'Email or password does not match'}), 401


    
    #user exist and emai/password matches
    access_token = create_access_token(identity=user.id)

    response={
        'access_token': access_token,
        'user_id': user.id,
        'message': f'Welcome {user.email}!'
    }

    return jsonify(response),200

@api.route('/signup', methods=['POST'])
def new_signup():
    email=request.json.get('email', None)
    password = request.json.get('password', None)

    email=email.lower()
    user=User.query.filter_by(email=email).first()

    if user is not None and user.email == email:
        response ={
            'message': f'{user.email} already exist. Please log in'
        }  
        return jsonify(response), 403  
    
    new_user = User()
    new_user.email = email
    new_user.password = password
    new_user.is_active = True
    db.session.add(new_user)
    db.session.commit()

    response={
        "message": f'{new_user.email} was successfuly added! Please log in.'
    }

    return jsonify(response),201

    


