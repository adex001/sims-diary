const getUserObject = (user) => {
    const { id, firstname, lastname, email, createdAt, updatedAt } = user;
    return {
        id,
        firstname,
        lastname,
        email,
        createdAt,
        updatedAt
    }
}

export default getUserObject;