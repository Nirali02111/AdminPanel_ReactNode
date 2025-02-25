export const getToken = () => {
  const userDataString = localStorage.getItem("Userdata");
  if (userDataString) {
    const { token } = JSON.parse(userDataString);
    return token;
  }

  return null; // Return null if token is not found
};
