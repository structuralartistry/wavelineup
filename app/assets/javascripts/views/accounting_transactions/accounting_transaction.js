Wavelineup.Views.AccountingTransaction = Backbone.View.extend({
  tagName: 'li',
  template: JST['accounting_transactions/accounting_transaction'],

  events: {
    'click .accounting_transaction_wrapper .detail .edit': 'edit',
    'click .accounting_transaction_wrapper .detail .delete': 'delete',
    'submit .accounting_transaction_wrapper .edit': 'update_accounting_transaction'
  },

  initialize: function() {
    _.bindAll(this, 'render')
    this.model.bind('change', this.render, this)
    this.model.bind('destroy', this.delete_accounting_transaction_wrapper, this)
  },

  render: function() {
    $(this.el).html(this.template({accounting_transaction: this.model.toJSON()}));
    return this;
  },

  delete_accounting_transaction_wrapper: function() {
    $(this.el).remove();
  },

  edit: function(event) {
    $('#new_accounting_transaction').hide();
    $('.accounting_transaction_wrapper[data-id=' + this.model.get('id') + '] .detail').hide();
    $('.accounting_transaction_wrapper[data-id=' + this.model.get('id') + '] .edit').show();
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

  update_accounting_transaction: function() {
    event.preventDefault();
    accounting_transaction_wrapper = '.accounting_transaction_wrapper[data-id=' + this.model.get('id') + ']';
    form = $(accounting_transaction_wrapper + ' .edit form')
    attributes = {
      t_datetime: $(form).find('#accounting_transaction_t_datetime').val(),
      t_type_id: $(form).find('#accounting_transaction_t_type_id').val(),
      amount: $(form).find('#accounting_transaction_amount').val(),
      category_id: $(form).find('#accounting_transaction_category_id').val(),
      account_id: $(form).find('#accounting_transaction_account_id').val(),
      note: $(form).find('#accounting_transaction_note').val()
    };
    this.model.save(attributes, {
      wait: true,
      success: function() {
        $('#notices').html('Accounting Transaction updated by server!');
        $('#new_accounting_transaction').show();
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
      Wavelineup.write_model_errors(errors);
    }
  }

});
