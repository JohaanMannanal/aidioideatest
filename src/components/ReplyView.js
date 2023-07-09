import React from 'react';

const ReplyView = ({ reply }) => {
  return (
    <div>
      {!reply.deleted && (
        <div>
          <h6>{reply.user_id}</h6>
          <div
            className="announcementContent"
            dangerouslySetInnerHTML={{ __html: reply.message }}
          />
        </div>
      )}
      {reply.deleted && <div>Deleted Reply</div>}
      {reply.replies.map((nestedReply) => (
        <ReplyView key={nestedReply.id} reply={nestedReply} />
      ))}
    </div>
  );
};

export default ReplyView;
