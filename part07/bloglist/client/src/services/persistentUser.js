export const getUser = () => {
    return window.localStorage.getItem("loggedBlogAppUser");
}

export const saveUser = (user) => {
    window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
}

export const removeUser = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
}

