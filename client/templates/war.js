var STRATEGY_EDIT_KEY = 'warStrategyEdit';

Template.war.events({
  'click .delete-war': function() {
    var confirmed = window.confirm('Do you really want to delete this war?');
    if (confirmed) {
      Wars.remove(this._id);
      Router.go('home');
    }
  },
  'focus textarea.war-strategy': function(event) {
    if (!isLeader())
      return;

    Session.set(STRATEGY_EDIT_KEY, true);
  },
  'blur textarea.war-strategy': function(event) {
    Session.set(STRATEGY_EDIT_KEY, false);
  },
  'keyup textarea': _.throttle(function(event) {
    Wars.update(this._id, {$set: {warStrategy: event.target.value}});
  }, 300)
});

Template.war.helpers({
  'editingStrategy': function() {
    return Session.get(STRATEGY_EDIT_KEY) && 'editing';
  },
  'strategyShouldDisplayed': function() {
    if (this.warStrategy) {
      return true;
    }

    return isLeader();
  }
});
