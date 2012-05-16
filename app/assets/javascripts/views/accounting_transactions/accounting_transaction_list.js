Wavelineup.Views.AccountingTransactionsList = Backbone.View.extend({
  el: '#content',

  template: function(json) {
    var t = " \
      <h1>Hello World Index View from Backbone!!!</h1> \
      <input class='new_accounting_transaction expense' type='submit' value='New Expense'> \
      <input class='new_accounting_transaction income' type='submit' value='New Income'> \
      <table id='accounting_transactions' class='table table-striped table-bordered table-condensed'> \
        <thead> \
          <tr> \
            <th>Date Time</th> \
            <th>Income/Expense</th> \
            <th>Amount</th> \
            <th>Category</th> \
            <th>Account</th> \
            <th>Note</th> \
            <th>Edit</th> \
          </tr> \
        </thead> \
        <tbody> \
        </tbody> \
      </table> \
      <style> \
        ul.selector li { \
          display: inline-block; \
          border: solid 1px black;  \
          width: 1.5in;  \
          height: 0.25in; \
          list-style-type: none; \
        } \
        #a_selector { \
          display: none; \
        } \
      </style> \
      <ul class='selector' id='a_selector'> \
        <li id='button_one' class='selected_value' data-value='1'>1</li> \
        <li id='button_two' class='selected_value' data-value='2'>2</li> \
      </ul>"
    return _.template(t,json);
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
