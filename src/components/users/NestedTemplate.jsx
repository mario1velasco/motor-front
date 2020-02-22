/////////////
// IMPORTS //
/////////////

// SERVICIOS
import { userService } from '@services/user-service';

// COMPONENTES PROPIOS
import Common from '@components/main-container/Common';

//////////////////////////
// COMPONENTE PRINCIPAL //
//////////////////////////
class NestedTemplate extends Common {
  /////////////////
  // CONSTRUCTOR //
  /////////////////
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  ///////////////
  // CALLBACKS //
  ///////////////
  componentDidMount() {
    userService.getUser(this.props.match.params.userId)
    .then(
      user => {
        this.setState({
          user: user
        })
      },
      error => {
        this.setState({apiError: error.message ? error.message : error })
      }
    );
  }
}

////////////
// EXPORT //
////////////
export default NestedTemplate;