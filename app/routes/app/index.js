import Ember from 'ember';

const { RSVP, Route } = Ember;

export default Route.extend({

  model() {
    return RSVP.hash({
      rooms: this.store.findAll('room'),
      newRoom: { name: '', errors: [] }
    });
  },

  actions: {
    createRoom() {
      // Get the "new room" model
      let data = this.get('currentModel.newRoom');
      // Create an ember-data record
      let room = this.store.createRecord('room', { name: data.name });
      // Clear any exisiting error messages
      this.set('currentModel.newRoom.errors', []);

      room.save().then(() => {
        // Success!
        this.get('flashMessages').success(`Created room: ${data.name}`);
        this.set('currentModel.newRoom.name', '');  // Clear input
      }).catch((response) => {
        // Remove the ember data record from the store
        this.store.unloadRecord(room);
        // Pass any error messages along
        this.set('currentModel.newRoom.errors', (response.errors || []).mapBy('detail'));
        // Failure!
        this.get('flashMessages').danger(`Problem creating room: ${data.name}`);
      });
    },

    removeRoom(room) {
      if (window.confirm('Are you sure?')) {
        room.destroyRecord().then(() => {
          this.get('flashMessages').success(`Deleted room: ${room.get('name')}`);
        }).catch(() => {
          this.get('flashMessages').danger(`Problem deleting room: ${room.get('name')}`);
        });
      }
    }
  }
});
