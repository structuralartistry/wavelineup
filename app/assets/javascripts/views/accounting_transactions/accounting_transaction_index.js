Wavelineup.Views.AccountingTransactionsIndex = Backbone.View.extend({
  el: '#container',

  template: JST['accounting_transactions/index'],

  events: {
    'submit #new_accounting_transaction': 'create_accounting_transaction'
  },

  initialize: function() {
    this.collection.on('reset', this.render, this);
    this.collection.on('add', this.append_accounting_transaction, this);
  },

  render: function() {
    data = { accounting_transactions: this.collection.toJSON() };
    $(this.el).html(this.template(data));
    this.collection.each(this.append_accounting_transaction);
    return this.el;
  },

  append_accounting_transaction: function(accounting_transaction) {
    view = new Wavelineup.Views.AccountingTransaction({model: accounting_transaction});
    $('#accounting_transactions').append(view.render().el);
  },

  create_accounting_transaction: function(event) {
    event.preventDefault();
    attributes = {
      t_datetime: $('#accounting_transaction_t_datetime').val(),
      t_type_id: $('#accounting_transaction_t_type_id').val(),
      amount: $('#accounting_transaction_amount').val(),
      category_id: $('#accounting_transaction_category_id').val(),
      account_id: $('#accounting_transaction_account_id').val(),
      note: $('#accounting_transaction_note').val()
    };
    this.collection.create(attributes, {
      wait: true,
      success: function() {
        $('#notices').html('Accounting Transaction accepted by server!');
        Wavelineup.reset_form('new_accounting_transaction');
      },
      error: function(model, response) {
        var attribute, errors, message, messages, _i, _len;
        if (response.status === 422) {
          $('#notices').html('');
          errors = $.parseJSON(response.responseText).errors;
          Wavelineup.write_model_errors(errors);
        }
      }
    })
  }
});
