Wavelineup.Views.AccountingTransaction = Backbone.View.extend({
  tagName: 'li',
  template: JST['accounting_transactions/accounting_transaction'],

  events: {
    'click .accounting_transaction #delete': 'delete',
    'click .accounting_transaction #save': 'update_accounting_transaction'
  },

  initialize: function() {
    _.bindAll(this, 'render')
    this.model.bind('change', this.render, this)
    this.model.bind('destroy', this.delete_accounting_transaction_wrapper, this)

    $(this.el).attr('class','accounting_transaction');
    $(this.el).attr('data-id',this.model.get('id'));
  },

  render: function() {
    $(this.el).html(this.template({accounting_transaction: this.model.toJSON()}));
    return this;
  },

  delete_accounting_transaction_wrapper: function() {
    $(this.el).remove();
  },

  edit: function(event) {
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

  update_accounting_transaction: function(event) {
    event.preventDefault();
    accounting_transaction_context = ".accounting_transaction[data-id='" + this.model.get('id') + "'] ";
    debugger
    attributes = {
      t_datetime: $(accounting_transaction_context + '#t_datetime').val(),
      t_type_id: $(accounting_transaction_context + '#t_type_id').html(),
      amount: $(accounting_transaction_context + '#amount').val(),
      category_id: $(accounting_transaction_context + '#category_id').val(),
      account_id: $(accounting_transaction_context + '#account_id').val(),
      note: $(accounting_transaction_context + '#note').val()
    };
    this.model.save(attributes, {
      wait: true,
      success: function() {
        $('#notices').html('Accounting Transaction updated by server!');
        $(".accounting_transaction[data-id='new']").show();
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
