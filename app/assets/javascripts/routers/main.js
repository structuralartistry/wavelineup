Wavelineup.Routers.Main = Backbone.Router.extend({
  routes: {
    '': 'main',
    'accounting_transactions': 'accounting_transactions',
    'accounting_transactions/:id': 'accounting_transactions'
  },

  main: function() {
    $('#container').html(new Wavelineup.Views.Layout().render().el);

    // just for now this is the landing page
    Wavelineup.Controllers.AccountingTransactions.list();
  },

  initialize: function(){
    $('#container').html(new Wavelineup.Views.Layout().render().el);
  },

  accounting_transactions: function(id) {
    if(id) { Wavelineup.Controllers.AccountingTransactions.new_edit(id); return; }
    Wavelineup.Controllers.AccountingTransactions.list();
  }

});
