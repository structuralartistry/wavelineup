Wavelineup.Views.AccountingTransaction = Backbone.View.extend({
  tagName: 'li',
  template: JST['accounting_transactions/accounting_transaction'],

  events: {
    'click .accounting_transaction__delete': 'delete',
    'click .accounting_transaction__save': 'update_accounting_transaction'
  },

  initialize: function() {
    _.bindAll(this, 'render')
    this.model.bind('change', this.render, this)
    this.model.bind('destroy', this.delete_accounting_transaction_wrapper, this)

    $(this.el).attr('id', 'accounting_transaction_' + this.model.get('id'));
  },

  render: function() {
    $(this.el).html(this.template({accounting_transaction: this.model.toJSON()}));
    return this;
  },

  delete_accounting_transaction_wrapper: function() {
    $(this.el).remove();
  },

  delete: function(event) {
    event.preventDefault();
    this.model.destroy({
      wait: true,
      success: function() {
        $('#notices').html('Accounting Transaction deleted by server!');
      },
      error: function() {
        this.handle_error;
      }
    })
  },

  update_accounting_transaction: function(event) {
    event.preventDefault();
    accounting_transaction_id = this.model.get('id');
    attributes = {
      date_time: $('#accounting_transaction__date_time__' + accounting_transaction_id).val(),
      credit_debit_id: $('#accounting_transaction__credit_debit_id__' + accounting_transaction_id).html(),
      amount: $('#accounting_transaction__amount__' + accounting_transaction_id).val(),
      category_id: $('#accounting_transaction__category_id__' + accounting_transaction_id).val(),
      account_id: $('#accounting_transaction__account_id__' + accounting_transaction_id).val(),
      note: $('#accounting_transaction__note__' + accounting_transaction_id).val()
    };
    this.model.save(attributes, {
      wait: true,
      success: function() {
        $('#notices').html('Accounting Transaction updated by server!');
      },
      error: function() {
        this.handle_error();
      }
    })
  },

  handle_error: function(model, response) {
    var attribute, errors, message, messages, _i, _len;
    if (response.status === 422) {
      $('#notices').html('');
      errors = $.parseJSON(response.responseText).errors;
      Wavelineup.write_model_errors_to_screen(errors);
    }
  }

});
