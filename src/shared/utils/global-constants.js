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
    },
    INDEX: {
      TITLE: 'Mi perfil',
      ADVERTS_LIST: 'Mis anuncios',
      BUTTONS: {
        EDIT_PROFILE: 'Editar mi perfil',
        LOG_OUT: 'Cerrar sesión'
      },
    },
  },

  // ADVERTS
  ADVERT_VIEWS: {
    FORM: {
      TITLE: 'Mi anuncio',
      FIELD_OK: 'Parece correcto!',
      ERRORS: {
        TITLE_REQUIRED: 'Resumen es obligatorio',
        DESCRIPTION_REQUIRED: 'Descripción es obligatorio',
        PRICE_REQUIRED: 'Precio es obligatorio',
      }
    },
    INDEX: {
      TITLE: 'Todos los anuncios',
    },
    SHOW: {
      TITLE: 'Anuncio',
    },
  },

  ///////////
  // VIEWS //
  ///////////

  // COMUNES
  BUTTONS : {
    EDIT: 'Editar',
    NEW: 'Nuevo',
    DELETE: 'Eliminar',
    SAVE: 'Guardar',
    UPDATE: 'Actualizar',
    LOG_OUT: 'Cerrar sesión',
    EDIT_PROFILE: 'Editar perfil',
    CONTACT: 'Contactar con el anunciante',
  },
});