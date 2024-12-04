const adminsReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true };
    case "LOGIN":
      return { ...state, loading: false, admin: action.payload };
    case "LOGOUT":
      return { ...state, loading: false, admin: null };
    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SET_ADMIN":
      return { ...state, loading: false, admin: action.payload };
    default:
      return state;
  }
};

export default adminsReducer;
