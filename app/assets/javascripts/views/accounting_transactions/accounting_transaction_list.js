Wavelineup.Views.AccountingTransactionsList = Backbone.View.extend({
  el: '#content',

  template: function(json) {
    return Wavelineup.Templates.AccountingTransactions.list(json);
  },

  events: {
    'mousedown .new_accounting_transaction': 'new_accounting_transaction'
  },

  initialize: function() {
    this.collection.on('reset', this.render, this);
    this.collection.on('add', this.append_accounting_transaction, this);
  },

  render: function() {
    var data = { accounting_transactions: this.collection.toJSON() };
    $(this.el).html(this.template(data));
    this.collection.each(this.append_accounting_transaction);

    return this.el;
  },

  new_accounting_transaction: function(event) {
    income_expense = 'expense'
    if($(event.target).hasClass('income')) income_expense = 'income';
    Wavelineup.Controllers.AccountingTransactions.new_edit('new', income_expense);
  },

  append_accounting_transaction: function(accounting_transaction) {
    view = new Wavelineup.Views.AccountingTransactionListItem({model: accounting_transaction});
    $('#accounting_transactions tbody').append(view.render().el);
  },

});
