import React from "react";

const ReplyView = ({ reply }) => {
  if (reply.deleted) {
    return (
      <div>
        <h6>Deleted Reply</h6>
      </div>
    );
  }

  return (
    <div>
      <h6>{reply.user_id}</h6>
      <div className="announcementContent">{reply.message}</div>
      {reply.replies.map((nestedReply) => (
        <ReplyView key={nestedReply.id} reply={nestedReply} />
      ))}
    </div>
  );
};

export default ReplyView;
