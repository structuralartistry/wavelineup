Wavelineup.Views.AccountingTransactionsList = Backbone.View.extend({
  el: '#content',

  template: function(json) {
    var t = " \
      <h1>Hello World Index View from Backbone!!!</h1> \
      <input id='accounting_transaction__new__button' type='submit' value='New'> \
      <table id='accounting_transactions'> \
        <thead> \
          <tr> \
            <th>Date Time</th> \
            <th>Credit/Debit</th> \
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
    'mousedown #accounting_transaction__new__button': 'new_accounting_transaction'
  },

  initialize: function() {
    this.collection.on('reset', this.render, this);
    this.collection.on('add', this.append_accounting_transaction, this);
  },

  render: function() {
    data = { accounting_transactions: this.collection.toJSON() };
    $(this.el).html(this.template(data));
    this.collection.each(this.append_accounting_transaction);

    // datatable
    oTable = $('#accounting_transactions').dataTable( {
      "aaSorting": [[ 4, "desc" ]]
    });

    return this.el;
  },

  new_accounting_transaction: function(event) {
    Wavelineup.Controllers.AccountingTransactions.new_edit('new');
  },

  append_accounting_transaction: function(accounting_transaction) {
    view = new Wavelineup.Views.AccountingTransactionListItem({model: accounting_transaction});
    $('#accounting_transactions tbody').append(view.render().el);
  },

});
