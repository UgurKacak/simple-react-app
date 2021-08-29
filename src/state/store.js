import { createStore } from "redux";

const initialState = {
	name: "",
	email: "",
	localization: "en"
};

const changeState = (state = initialState, { type, ...rest }) => {
	switch (type) {
		case "set":
			return { ...state, ...rest };
		default:
			return state;
	}
};

const store = createStore(changeState);
export default store;
