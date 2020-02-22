module.exports = Object.freeze({
  ///////////
  // COMÚN //
  ///////////
  BUTTON_BACK_TEXT: '< Volver',

  ///////////
  // PATHS //
  ///////////

  // COMUNES
  HOME_PATH: '/home',
  LOGIN_PATH: '/log-in',
  SIGNUP_PATH: '/sign-up',
  ROOT_PATH: '/',

  // RESTO
  ADVERTS_PATH: '/adverts',
  USERS_PATH: '/users',

  // FORM VALIDATIONS
  EMPTY_ERROR_FORM_VALIDATION: 'Las contraseñas han de coincidir.',
  LENGTH_ERROR_FORM_VALIDATION: 'Número de caracteres insuficiente.',
  PASSWORD_ERROR_FORM_VALIDATION: 'Las contraseñas han de coincidir',

  ////////////
  // MODELS //
  ////////////

  // USERS
  USER_MODEL: {
    FIELDS : {
      EMAIL: 'Email',
      FIRST_NAME: 'Nombre',
      LAST_NAME: 'Apellido',
      TELEPHONE: 'Teléfono',
      USERNAME: 'Nombre de usuario',
    },
  },

  // ADVERTS
  ADVERT_MODEL: {
    FIELDS : {
      TITLE: 'Título',
      DESCRIPTION: 'Descripción',
      CITY: 'Ciudad',
      PRICE: 'Precio',
    },
  },

  ///////////
  // VIEWS //
  ///////////

  // USER
  USER_VIEWS: {
    FORM: {
      TITLE: 'Actualizar datos de usuario',
      FIELD_OK: 'Parece correcto!',
      ERRORS: {
        TELEPHONE_REQUIRED: 'Teléfono es obligatorio',
        USERNAME_REQUIRED: 'Nombre de usuario es obligatorio',
      }
    }
  },

  // ADVERTS
  ADVERT_VIEWS: {
    FORM: {
      TITLE: 'Creación de un nuevo anuncio',
      FIELD_OK: 'Parece correcto!',
      ERRORS: {
        TITLE_REQUIRED: 'Resumen es obligatorio',
        DESCRIPTION_REQUIRED: 'Descripción es obligatorio',
        PRICE_REQUIRED: 'Precio es obligatorio',
      }
    }
  }
});