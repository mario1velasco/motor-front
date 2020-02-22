/////////////
// IMPORTS //
/////////////

// BÁSICO
import React from 'react';
import { withRouter } from "react-router-dom";

// SERVICIOS
import { advertService } from '@services/advert-service';

// COMPONENTES EXTERNOS
import { Formik } from 'formik';
import * as yup from 'yup';
import { Form, Col, InputGroup, Button } from 'react-bootstrap';

// COMPONENTES PROPIOS
import Common from '@components/main-container/Common';

// CONSTANTES
import SHARED from '@utils/global-constants';

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  price: yup.string().required(),
});

class AdvertsForm extends Common {
  /////////////////
  // CONSTRUCTOR //
  /////////////////
  constructor(props) {
    super(props);
    this.state = {
      apiError: null
    };
  }

  ///////////////
  // CALLBACKS //
  ///////////////
  componentDidMount() {
    // Si es edición llamar API
    // if (this.props.advertId) {
    //   advertService.getAdvert(this.props.advertId)
    //   .then(
    //     advert => {
    //       this.setState({
    //         advert: advert
    //       })
    //     },
    //     error => {
    //       this.setState({apiError: error.message ? error.message : error })
    //     }
    //   );
    // }
  }

  onSubmitForm(values, { setSubmitting }) {
    advertService.saveAdvert(values, this.props.advertId)
    .then(
      advert => {
        setSubmitting(false);
        this.props.history.push(SHARED.ADVERTS_PATH);
      },
        error => {
          this.setState({apiError: error.message ? error.message : error })
      }
    );
  }

  /////////////
  // RENDERS //
  /////////////
  render() {
    const currentUser= this.getCurrentUser();
    if (currentUser){
      return (
        <div>
          {this.getAllHelpers().renderError(this.state.apiError)}
          {this.getAllHelpers().renderBackButton()}
          <div>
            <h2>{SHARED.ADVERT_VIEWS.FORM.TITLE}</h2>
            <Formik
              validationSchema={schema}
              onSubmit={(values, { setSubmitting }) => {
                this.onSubmitForm(values, { setSubmitting })
              }}
              initialValues={{
                title: this.state.advert ? this.state.advert.title : "",
                description: this.state.advert ? this.state.advert.description : "",
                price: this.state.advert ? this.state.advert.price : "",
                city: this.state.advert ? this.state.advert.city : "",
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
                    <Form.Group as={Col} md="12" controlId="formTitle">
                      <Form.Label>{SHARED.ADVERT_MODEL.FIELDS.TITLE}</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        value={values.title}
                        placeholder={SHARED.ADVERT_MODEL.FIELDS.TITLE}
                        onChange={handleChange}
                        isValid={touched.title && !errors.title}
                        isInvalid={!!errors.title}
                      />
                      <Form.Control.Feedback>{SHARED.ADVERT_VIEWS.FORM.FIELD_OK}</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.title}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="formDescription">
                      <Form.Label>{SHARED.ADVERT_MODEL.FIELDS.DESCRIPTION}</Form.Label>
                      <Form.Control
                        type="text"
                        name="description"
                        value={values.description}
                        placeholder={SHARED.ADVERT_MODEL.FIELDS.DESCRIPTION}
                        onChange={handleChange}
                        isValid={touched.description && !errors.description}
                        isInvalid={!!errors.description}
                        as="textarea"
                      />
                      <Form.Control.Feedback>{SHARED.ADVERT_VIEWS.FORM.FIELD_OK}</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.description}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="6" controlId="formPrice">
                      <Form.Label>{SHARED.ADVERT_MODEL.FIELDS.PRICE}</Form.Label>
                      <Form.Control
                        type="text"
                        name="price"
                        value={values.price}
                        placeholder={SHARED.ADVERT_MODEL.FIELDS.PRICE}
                        onChange={handleChange}
                        isValid={touched.price && !errors.price}
                        isInvalid={!!errors.price}
                      />
                      <Form.Control.Feedback>{SHARED.ADVERT_VIEWS.FORM.FIELD_OK}</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.price}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="formCity">
                      <Form.Label>{SHARED.ADVERT_MODEL.FIELDS.CITY}</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={values.city}
                        placeholder={SHARED.ADVERT_MODEL.FIELDS.CITY}
                        onChange={handleChange}
                        isValid={touched.city && !errors.city}
                        isInvalid={!!errors.city}
                      />
                      <Form.Control.Feedback>{SHARED.ADVERT_VIEWS.FORM.FIELD_OK}</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
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
export default withRouter(AdvertsForm);