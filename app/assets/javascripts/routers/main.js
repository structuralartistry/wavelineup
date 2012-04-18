Wavelineup.Routers.Main = Backbone.Router.extend({
  routes: {
    '': 'main'
  },

  main: function() {
    $('#container').html(new Wavelineup.Views.Layout().render().el);

    // just for now this is the landing page
    Wavelineup.Controllers.AccountingTransactions.list();
  },

  initialize: function(){
    $('#container').html(new Wavelineup.Views.Layout().render().el);
  },

  accounting_transaction_list: function() {
    Wavelineup.Controllers.AccountingTransactions.list();
  }

});
