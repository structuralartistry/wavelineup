Wavelineup.Routers.Main = Backbone.Router.extend({
  routes: {
    '': 'main',
    'accounting_transactions': 'accounting_transactions',
    'accounting_transactions/:id': 'accounting_transactions',
    'accounting_transactions/:id/:income_expense': 'accounting_transactions'
  },

  main: function() {
    $('#container').html(new Wavelineup.Views.Layout().render().el);

    // just for now this is the landing page
    Wavelineup.Controllers.AccountingTransactions.list();
  },

  initialize: function(){
    $('#container').html(new Wavelineup.Views.Layout().render().el);
  },

  accounting_transactions: function(id, income_expense) {
    if(id) {
      Wavelineup.Controllers.AccountingTransactions.new_edit(id, income_expense);
      return;
    } else {
      Wavelineup.Controllers.AccountingTransactions.list();
    }
  }

});
