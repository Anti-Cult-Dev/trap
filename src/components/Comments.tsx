import React, { useState } from 'react';
import { useGlobalStore } from '../store/globalStore';

interface CommentsProps {
  agentId: string;
}

export default function Comments({ agentId }: CommentsProps) {
  const [newComment, setNewComment] = useState('');
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [tempUsername, setTempUsername] = useState('');
  const { addComment, getComments, username, setUsername } = useGlobalStore();
  const comments = getComments(agentId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      setShowUsernameModal(true);
      return;
    }
    if (newComment.trim()) {
      addComment(agentId, newComment.trim());
      setNewComment('');
    }
  };

  const handleSetUsername = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempUsername.trim()) {
      setUsername(tempUsername.trim());
      setShowUsernameModal(false);
      // If there was a pending comment, submit it
      if (newComment.trim()) {
        addComment(agentId, newComment.trim());
        setNewComment('');
      }
    }
  };

  return (
    <div className="mt-8 max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      
      {/* Username Modal */}
      {showUsernameModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg w-96">
            <h4 className="text-lg font-semibold mb-4">Choose a Username</h4>
            <form onSubmit={handleSetUsername}>
              <input
                type="text"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full p-2 rounded bg-gray-800 text-white mb-4"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUsernameModal(false)}
                  className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-pink-600 hover:bg-pink-500"
                >
                  Set Username
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-3 rounded bg-gray-800 text-white min-h-[100px]"
          required
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-pink-600 hover:bg-pink-500 transition-colors"
          >
            Post Comment
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-800 rounded p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="font-semibold text-pink-400">{comment.username}</span>
              <span className="text-sm text-gray-400">
                {new Date(comment.timestamp).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-200">{comment.content}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-gray-400 text-center">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}
