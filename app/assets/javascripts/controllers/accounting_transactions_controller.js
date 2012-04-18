Wavelineup.Controllers.AccountingTransactions = {
  before: function() {
    if(!Wavelineup.Collections.accounting_transactions) {
      Wavelineup.Collections.accounting_transactions = new Wavelineup.Collections.AccountingTransactions();
      Wavelineup.Collections.accounting_transactions.fetch();
    }
  },

  neww: function() {
    this.before();
    var view = new Wavelineup.Views.AccountingTransaction({model: new Wavelineup.Models.AccountingTransaction()});
    $('#content').html(view.render().el);
  },

  edit: function(model) {
    this.before();
    var accounting_transaction = Wavelineup.Collections.accounting_transactions.get(id);
    var view = new Wavelineup.Views.AccountingTransaction({model: accounting_transaction});
    $('#content').html(view.render().el);
  },

  list: function() {
    this.before();
    var view = new Wavelineup.Views.AccountingTransactionsList({collection: Wavelineup.Collections.accounting_transactions})
    $('#content').html(view.render().el);
  }

}
