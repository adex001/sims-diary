import bcrypt from "bcryptjs";

const verifyPassword = async function(myPassword, databasePassword) {
    const data = await bcrypt.compare(myPassword, databasePassword);
    return data;
  };

  export default verifyPassword;