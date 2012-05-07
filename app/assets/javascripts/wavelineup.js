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
      this.set_base_data();
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
      this.instance = { collections: {}, routers: {} };
    },

    format_model_errors: function (errors) {
      var messages, message, attribute, i, len, output='';
      if (errors) {
        for (attribute in errors) {
          messages = errors[attribute];
          for (i = 0, len = messages.length; i < len; i++) {
            message = messages[i];
            output += (attribute + ' ' + message + '<br>');
          }
        }
      }
      return output;
    }

  }
}());
