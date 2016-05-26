import Ember from 'ember';

const { Route, inject } = Ember;

export default Route.extend({

  flashMessages: inject.service(),
  session: inject.service(),

  actions: {
    doLogin() {
      const user = this.get('currentModel');
      this.get('session').authenticate(
        'authenticator:peepchat', user.email, user.password
      ).then(() => {

        this.get('flashMessages').success('Logged in!');

      }).catch((response) => {

        const { errors } = response;

        if (errors.mapBy('code').indexOf(401) >= 0) {

          // Unauthorized
          this.get('flashMessages').danger(
            'There was a problem with your username or password, please try again'
          );

        } else {

          // All other errors
          this.get('flashMessages').danger('Server error');
        }
      });
    }
  },

  model() {
    return {
      email: '',
      password: ''
    };
  }
});
