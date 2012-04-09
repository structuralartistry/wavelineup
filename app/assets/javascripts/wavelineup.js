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
  reset_form: function(id) {
    var $form = $('#' + id);
    $form.find('input:text, input:password, input:file, select').val('');
    $form.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
  }
}
