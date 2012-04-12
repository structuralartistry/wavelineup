window.Wavelineup = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Templates: {},
  init: function() {
    new Wavelineup.Routers.AccountingTransactions();
    // triggers the matching router for what is in the url:
    try{ Backbone.history.start(); }
    catch(error){
      // can not figure out how to do this in the jasmine test suite, so doing here
      Backbone.history.stop();
      Backbone.history.start();
    }
  },
  write_model_errors_to_screen: function(errors) {
    for (attribute in errors) {
      messages = errors[attribute];
      for (_i = 0, _len = messages.length; _i < _len; _i++) {
        message = messages[_i];
        $('#notices').append("" + attribute + " " + message + "<br>");
      }
    }
  }
}
