const adaptOneCommentToClient = (comment) => ({
  id: String(comment.id),
  quote: comment.comment,
  date: comment.date,
  rating: String(comment.rating),
  visitorId: String(comment.user.id),
  visitorName: comment.user.name,
  visitorAvatar: comment.user.avatar_url,
  visitorIsPro: comment.user.is_pro,
});

export const adaptAllCommentsToClient = (data) => data.map(adaptOneCommentToClient);
