export const userAdapter = (data) => ({
  userEmail: data[`email`],
  userAvatar: data[`avatar_url`],
});
