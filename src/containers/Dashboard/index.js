import Dashboard from '../../components/Dashboard';
import { connect } from 'react-redux'; 
import { withRouter } from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        userDetails: state.session.userDetails,
    }
}

export default withRouter(connect(mapStateToProps)(Dashboard))