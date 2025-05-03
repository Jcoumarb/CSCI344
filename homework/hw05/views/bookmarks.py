import json

from flask import Response, request
from flask_restful import Resource

from models import db
from models.bookmark import Bookmark


class BookmarksListEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def get(self):
        
        bookmarks = Bookmark.query.filter_by(user_id=self.current_user.id)
        data = [item.to_dict() for item in bookmarks.all()]

        return Response(
            json.dumps(data),
            mimetype="application/json",
            status=200,
        )

    def post(self):
        
        data = request.get_json()
        post_id = request_data.get("post_id")

        post = Post.query.get(post_id)
        if post is None:
            return Response(
                json.dumps({"message": f"post id={post_id} not found"}),
                mimetype="application/json",
                status=404,
            )

        new_bookmark = Bookmark(
            post_id=post_id,
            user_id=self.current_user.id,
        )

        db.session.add(new_bookmark)
        db.session.commit()

        return Response(
            json.dumps(new_bookmark.to_dict()),
            mimetype="application/json",
            status=201,
        )


class BookmarkDetailEndpoint(Resource):

    def __init__(self, current_user):
        self.current_user = current_user

    def delete(self, id):
        # TODO: Add Delete Logic...
        print(id)
        return Response(
            json.dumps({}),
            mimetype="application/json",
            status=200,
        )


def initialize_routes(api, current_user):
    api.add_resource(
        BookmarksListEndpoint,
        "/api/bookmarks",
        "/api/bookmarks/",
        resource_class_kwargs={"current_user": current_user},
    )

    api.add_resource(
        BookmarkDetailEndpoint,
        "/api/bookmarks/<int:id>",
        "/api/bookmarks/<int:id>",
        resource_class_kwargs={"current_user": current_user},
    )
