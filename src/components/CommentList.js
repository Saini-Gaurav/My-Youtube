import React from "react";
import Comment from "./Comment";

const CommentList = ({ comments }) => {
  return comments?.map((comment, index) => (
    <div key={index}>
      <Comment data={comment} />
      <div className="pl-1 ml-1 border-l-black">
        <CommentList comments={comment?.replies} />
      </div>
    </div>
  ));
};

export default CommentList;
