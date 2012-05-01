(function () {
  'use strict';

  window.Wavelineup = {
    Collections: {},
    Controllers: {},
    Models: {},
    Routers: {},
    Templates: {},
    Views: {},

    init: function () {
      this.set_instance();
      this.instance.routers.main = new Wavelineup.Routers.Main();
      // triggers the matching router for what is in the url:
      try {
        Backbone.history.start();
      } catch (error) {
        // can not figure out how to do this in the jasmine test suite, so doing here
        Backbone.history.stop();
        Backbone.history.start();
      }
    },

    // not sure if is best pattern, but putting instances of created objects here so can clear the 'app instance'
    // between test runs... probably does not matter on standard usage but does on tests as the window is only
    // loaded once
    set_instance: function () {
      this.instance = { collections: {}, data: { option_selector: {} }, routers: {} };
      this.instance.data.option_selector['credit_debit'] = {'values': ['Income', 'Expense', 'Other']};
    },

    write_model_errors_to_screen: function (errors) {
      var messages, message, attribute, i, len;
      if (errors) {
        for (attribute in errors) {
          messages = errors[attribute];
          for (i = 0, len = messages.length; i < len; i++) {
            message = messages[i];
            $('#notices').append(attribute + ' ' + message + '<br>');
          }
        }
      }
    }

  }
}());
