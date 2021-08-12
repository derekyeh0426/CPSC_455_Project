function UserLogInAction (User){
    return {
        type: "Log_In",
        payload: User
    };
};

export default UserLogInAction;