Wavelineup.Routers.Main = Backbone.Router.extend({
  routes: {
    '': 'accounting_transaction_list',
    'accounting_transactions': 'accounting_transaction_list',
    'accounting_transactions/new': 'new_accounting_transaction'
  },

  initialize: function(){
    $('#container').html(new Wavelineup.Views.Layout().render().el);
  },

  accounting_transaction_list: function() {
    this.before(function() {
      var view = new Wavelineup.Views.AccountingTransactionsList({collection: Wavelineup.Collections.accounting_transactions})
      $('#content').html(view.render().el);
    });
  },

  new_accounting_transaction: function() {
    this.before(function() {
      var view = new Wavelineup.Views.AccountingTransactionNew();
      $('#content').html(view.render().el);
    });
  },

  before: function(callback) {
    if(Wavelineup.Collections.accounting_transactions) {
      if(callback) callback();
    } else {
      Wavelineup.Collections.accounting_transactions = new Wavelineup.Collections.AccountingTransactions();
      Wavelineup.Collections.accounting_transactions.fetch();
      if(callback) callback();
    }
  }

});
