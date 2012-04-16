Wavelineup.Views.AccountingTransactionNew = Backbone.View.extend( {
  tagName: 'li',
  template: JST['accounting_transactions/new'],

  events: {
    'mousedown .delete': 'delete',
    'mousedown .save': 'save'
  },

  render: function() {
    $(this.el).html(this.template({}));
    return this;
  },

  save: function(event) {
    event.preventDefault();
    attributes = {
      date_time: $('input#date_time').val(),
      credit_debit_id: $('input#credit_debit_id').val(),
      amount: $('input#amount').val(),
      category_id: $('input#category_id').val(),
      account_id: $('input#account_id').val(),
      note: $('input#note').val()
    };

    Wavelineup.Collections.accounting_transactions.create(attributes, {
      wait: true,
      success: function() {
        $('#notices').html('Accounting Transaction accepted by server!');
        Wavelineup.Routers.main.navigate('accounting_transactions', {trigger: true});
      },
      error: function(model, response) {
        var attribute, errors, message, messages, _i, _len;
        if (response.status === 422) {
          $('#notices').html('');
          errors = $.parseJSON(response.responseText).errors;
          Wavelineup.write_model_errors_to_screen(errors);
        }
      }
    });
  },

  delete: function() {
    alert('delete');
  }
});
