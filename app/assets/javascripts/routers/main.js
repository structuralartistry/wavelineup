Wavelineup.Routers.Main = Backbone.Router.extend({
  routes: {
    '': 'accounting_transaction_list',
    'accounting_transactions': 'accounting_transaction_list',
    'accounting_transactions/new': 'accounting_transaction_new',
    'accounting_transactions/:id': 'accounting_transaction_edit'
  },

  initialize: function(){
    $('#container').html(new Wavelineup.Views.Layout().render().el);
  },

  accounting_transaction_list: function() {
    this.before();
    var view = new Wavelineup.Views.AccountingTransactionsList({collection: Wavelineup.Collections.accounting_transactions})
    $('#content').html(view.render().el);
  },

  accounting_transaction_new: function() {
    this.before();
    var view = new Wavelineup.Views.AccountingTransaction({model: new Wavelineup.Models.AccountingTransaction()});
    $('#content').html(view.render().el);
  },

  accounting_transaction_edit: function(id) {
    this.before();
    var accounting_transaction = Wavelineup.Collections.accounting_transactions.get(id);
    var view = new Wavelineup.Views.AccountingTransaction({model: accounting_transaction});
    $('#content').html(view.render().el);
  },

  before: function(callback) {
    if(Wavelineup.Collections.accounting_transactions) {
      console.log(Wavelineup.Collections.accounting_transactions.length);
    }
    if(Wavelineup.Collections.accounting_transactions) {
      if(callback) callback();
    } else {
      Wavelineup.Collections.accounting_transactions = new Wavelineup.Collections.AccountingTransactions();
      Wavelineup.Collections.accounting_transactions.fetch();
      if(callback) callback();
    }
  }

});

//Wavelineup.Routers.Main = Backbone.Router.extend({
//  routes: {
//    '': 'accounting_transaction_list',
//    'accounting_transactions': 'accounting_transaction_list',
//    'accounting_transactions/new': 'accounting_transaction_new',
//    'accounting_transactions/:id': 'accounting_transaction_edit'
//  },
//
//  initialize: function(){
//    $('#container').html(new Wavelineup.Views.Layout().render().el);
//  },
//
//  accounting_transaction_list: function() {
//    this.before(function() {
//      var view = new Wavelineup.Views.AccountingTransactionsList({collection: Wavelineup.Collections.accounting_transactions})
//      $('#content').html(view.render().el);
//    });
//  },
//
//  accounting_transaction_new: function() {
//    this.before(function() {
//      var view = new Wavelineup.Views.AccountingTransaction({model: new Wavelineup.Models.AccountingTransaction()});
//      $('#content').html(view.render().el);
//    });
//  },
//
//  accounting_transaction_edit: function(id) {
//    this.before(function() {
//
//console.log(Wavelineup.Collections.accounting_transactions.length);
//      var accounting_transaction = Wavelineup.Collections.accounting_transactions.get(id);
//      var view = new Wavelineup.Views.AccountingTransaction({model: accounting_transaction});
//      $('#content').html(view.render().el);
//    });
//  },
//
//  before: function(callback) {
//    if(Wavelineup.Collections.accounting_transactions) {
//      if(callback) callback();
//    } else {
//      Wavelineup.Collections.accounting_transactions = new Wavelineup.Collections.AccountingTransactions();
//      Wavelineup.Collections.accounting_transactions.fetch();
//      if(callback) callback();
//    }
//  }
//
//});
