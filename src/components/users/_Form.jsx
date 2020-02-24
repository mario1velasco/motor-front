/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';
import { withRouter } from "react-router-dom";

// SERVICIOS
import { userService } from '@services/user-service';

// COMPONENTES EXTERNOS
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Col, InputGroup, Button } from 'react-bootstrap';

// COMPONENTES PROPIOS
import Common from '@components/main-container/Common';

// CONSTANTES
import SHARED from '@utils/global-constants';

const schema = yup.object({
  email: yup.string().required(),
  username: yup.string().required(),
});

class UsersForm extends Common {
  /////////////////
  // CONSTRUCTOR //
  /////////////////
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      apiError: null,
    };
  }

  ///////////////
  // CALLBACKS //
  ///////////////
  componentDidMount() {
    // Si es edición llamar API
    if (this.props.userId) {
      userService.getUser(this.props.userId)
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

  onSubmitForm(values, { setSubmitting }) {
    userService.saveUser(values, this.props.userId)
    .then(
      user => {
        setSubmitting(false);
        this.props.history.push(SHARED.HOME_PATH);
      },
      error => {
        setSubmitting(false);
        this.setState({apiError: error.message ? error.message : error })
      }
    );
  }

  /////////////
  // RENDERS //
  /////////////
  render() {
    if (this.state.user){
      return (
        <div>
          {this.getAllHelpers().renderError(this.state.apiError)}
          {this.getAllHelpers().renderBackButton()}
          <div>
            <h2>{SHARED.USER_VIEWS.FORM.TITLE}</h2>
            <Formik
              validationSchema={schema}
              onSubmit={(values, { setSubmitting }) => {
                this.onSubmitForm(values, { setSubmitting })
              }}
              initialValues={{
                email: this.state.user.email,
                firstName: this.state.user.firstName,
                lastName: this.state.user.lastName,
                username: this.state.user.username,
                telephone: this.state.user.telephone,
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
                isSubmitting,
              }) => (
                <Form
                  ref={(form) => { this.form = form }}
                  onSubmit={handleSubmit}
                >
                  <Form.Row>
                    <Form.Group as={Col} md="6" controlId="formEmail">
                      <Form.Label>{SHARED.USER_MODEL.FIELDS.EMAIL}</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={values.email}
                        placeholder={SHARED.USER_MODEL.FIELDS.EMAIL}
                        disabled
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="6" controlId="formFirstName">
                      <Form.Label>{SHARED.USER_MODEL.FIELDS.FIRST_NAME}</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        placeholder={SHARED.USER_MODEL.FIELDS.FIRST_NAME}
                        onChange={handleChange}
                        isValid={touched.firstName && !errors.firstName}
                      />
                      <Form.Control.Feedback>{SHARED.USER_VIEWS.FORM.FIELD_OK}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="formLastName">
                      <Form.Label>{SHARED.USER_MODEL.FIELDS.LAST_NAME}</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder={SHARED.USER_MODEL.FIELDS.LAST_NAME}
                        value={values.lastName}
                        onChange={handleChange}
                        isValid={touched.lastName && !errors.lastName}
                      />
                      <Form.Control.Feedback>{SHARED.USER_VIEWS.FORM.FIELD_OK}</Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="6" controlId="formUsername">
                      <Form.Label>{SHARED.USER_MODEL.FIELDS.USERNAME}</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder={SHARED.USER_MODEL.FIELDS.USERNAME}
                        value={values.username}
                        onChange={handleChange}
                        isValid={touched.username && !errors.username}
                        isInvalid={!!errors.username}
                      />
                      <Form.Control.Feedback>{SHARED.USER_VIEWS.FORM.FIELD_OK}</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="formTelephone">
                      <Form.Label>{SHARED.USER_MODEL.FIELDS.TELEPHONE}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={SHARED.USER_MODEL.FIELDS.TELEPHONE}
                        name="telephone"
                        value={values.telephone}
                        onChange={handleChange}
                        isValid={touched.telephone && !errors.telephone}
                      />
                      <Form.Control.Feedback>{SHARED.USER_VIEWS.FORM.FIELD_OK}</Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>
                  <Button type="submit" disabled={isSubmitting}>Actualizar</Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

////////////
// EXPORT //
////////////
export default withRouter(UsersForm);