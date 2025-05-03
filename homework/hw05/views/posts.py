import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.post import Post
from views import get_authorized_user_ids


def get_path():
    return request.host_url + "api/posts/"


class PostListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):

        limit = request.args.get("limit")
        if limit is None:
            limit = 20


        #this checks for a valid limit
        try:
            limit = int(limit)
        except:
            return Response(json.dumps({"message": "Invalid integer"}), mimetype="application/json", status=400)

        if limit > 50:
            return Response(json.dumps({"message": "Invalid limit (n <= 50)"}), mimetype="application/json", status=400)

        #this applies the limit
        ids_for_me_and_my_friends = get_authorized_user_ids(self.current_user)
        posts = (
                Post.query
                .filter(Post.user_id.in_(ids_for_me_and_my_friends))
                .limit(limit)
        )

        data = [item.to_dict(user=self.current_user) for item in posts.all()]
        return Response(json.dumps(data), mimetype="application/json", status=200)

    def post(self):

        new_post = request.json

        image = new_post.get("image_url")

        if image is None:
            return Response(
                json.dumps({"message": "An image is required to make a post"}),
                mimetype="application/json",
                status=400
            )

        post = Post(
            image_url=image,
            user_id=self.current_user.id,
            caption=data.data.get("caption"),
            alt_text=data.get("alt_text"),
        )

        db.session.add(post)
        db.session.commit()

        return Response(json.dumps(post.to_dict(user=self.current_user)), mimetype="application/json", status=201)


class PostDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def patch(self, id):
        print("POST id=", id)
        
        data = request.json
        post = Post.query.get(id)

        # checks that post exists and is the current user's post
        if post is None:
            return Response(
                json.dumps({"message": "Invalid post ID"}),
                mimetype="application/json",
                status=404,
            )

        if post.user_id != self.current_user.id:
            return Response(
                json.dumps({"message": "you are not authorized to edit this post"}),
                mimetype="application/json",
                status=404,
            )

        image = data.get("image_url")
        caption = data.get("caption")
        alt_text = data.get("alt_text")

        if image is not None:
            post.image_url = image

        if caption is not None:
            post.caption = caption

        if alt_text is not None:
            post.alt_text = alt_text

        db.session.commit()

        edited_post = Post.query.get(id)

        return Response(json.dumps(edited_post.to_dict()), mimetype="application/json", status=200)

    def delete(self, id):
        print("POST id=", id)

        post = Post.query.get(id)

        if post is None:
            return Response(
                json.dumps({"message": f"post id={id} not found"}),
                mimetype="application/json",
                status=404,
            )

        if post.user_id != self.current_user.id:
            return Response(
                json.dumps({"message": f"you are not authorized to get post id={id}"}),
                mimetype="application/json",
                status=404,
            )

        Post.query.filter_by(id=id).delete()
        db.session.commit()

        return Response(
            json.dumps({"message":"post deleted"}),
            mimetype="application/json",
            status=200,
        )

    def get(self, id):
        print("POST id=", id)
        
        post = Post.query.get(id)

        #checks that post is exists before returning it
        if post is None:
            return Response(
                json.dumps({"message": "Invalid post id"}),
                mimetype="application/json",
                status=404,
            )

        return Response(
            json.dumps(post.to_dict()),
            mimetype="application/json",
            status=200,
        )


def initialize_routes(api, current_user):
    api.add_resource(
        PostListEndpoint,
        "/api/posts",
        "/api/posts/",
        resource_class_kwargs={"current_user": current_user},
    )
    api.add_resource(
        PostDetailEndpoint,
        "/api/posts/<int:id>",
        "/api/posts/<int:id>/",
        resource_class_kwargs={"current_user": current_user},
    )
