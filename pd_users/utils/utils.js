export const createUserId = async (lastUserId) => {
  let newUser = parseInt(lastUserId.slice(5)) + 1;
  return `PDUSR${newUser.toString().padStart(7, "0")}`;
};