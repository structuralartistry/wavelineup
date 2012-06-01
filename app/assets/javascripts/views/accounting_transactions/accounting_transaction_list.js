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
    //var data = { accounting_transactions: this.collection.toJSON() };
    //$(this.el).html(this.template(data));
    var pagination_info = {
      "page_record_start": this.collection.page_record_start,
      "page_record_end": this.collection.page_record_end,
      "total_record_count": this.collection.total_record_count
    }
    $(this.el).html(this.template(pagination_info));
    this.collection.each(this.append_accounting_transaction);

    return this.el;
  },

  new_accounting_transaction: function(event) {
    var income_expense = 'expense'
    if($(event.target).hasClass('income')) income_expense = 'income';
    Wavelineup.Controllers.AccountingTransactions.new_edit('new', income_expense);
  },

  append_accounting_transaction: function(accounting_transaction) {
    var view = new Wavelineup.Views.AccountingTransactionListItem({model: accounting_transaction});
    $('#accounting_transactions tbody').append(view.render().el);
  },

});
