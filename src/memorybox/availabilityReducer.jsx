// Reducer Function
const availabilityReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true, error: null };
    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SET_SUCCESS":
      return { ...state, loading: false, success: true, error: null };
    case "RESET_SUCCESS":
      return { ...state, success: false };
    case "SET_AVAILABILITIES":
      return { ...state, availabilities: action.payload, loading: false };
    case "ADD_AVAILABILITY":
      return {
        ...state,
        availabilities: [...state.availabilities, action.payload],
        loading: false,
      };
    case "UPDATE_AVAILABILITY":
      return {
        ...state,
        availabilities: state.availabilities.map((availability) =>
          availability._id === action.payload._id
            ? { ...availability, ...action.payload }
            : availability
        ),
        loading: false,
      };
    case "DELETE_AVAILABILITY":
      return {
        ...state,
        availabilities: state.availabilities.filter(
          (availability) => availability._id !== action.payload
        ),
        loading: false,
      };
    default:
      return state;
  }
};

export default availabilityReducer;
