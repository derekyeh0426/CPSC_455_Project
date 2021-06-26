function logIn (User){
    return {
        type: "Log_In",
        payload: User
    };
};

export default logIn;