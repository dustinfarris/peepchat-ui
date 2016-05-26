import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['input-field'],
  type: 'text',

  _errorMessages: computed('errors.[]', function() {
    console.log(this.get('errors'));
    return (this.get('errors') || []).join(', ');
  })
});
