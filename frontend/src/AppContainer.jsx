import { connect } from "react-redux";
import { compose } from "redux";
import App from "./App";
import { setAuthThunk } from "./store/authReducer";

const AppContainer = (props) => {
  return <App setAuthThunk={props.setAuthThunk} />;
};

let mapStateToProps = (state) => {
  return {};
};

// let mapDispatchToProps = (dispatch) => {
//   return {
//     addData: (token) => {
//       dispatch(setAuthFromStorageAction(token))
//     },
//     setAuthFromStorageThunk
//   }
// }
export default compose(connect(mapStateToProps, {setAuthThunk}))(AppContainer)